import { BatteryPackInputs, BatteryPackResult, SolarGeneratorInputs, SolarGeneratorResult } from './types';

/**
 * Deterministic Lithium Battery Pack Calculator Engine
 * Conforms to Emax Engineering Protocol (Version 1.2)
 */
export function calculateBatteryPack(inputs: BatteryPackInputs): BatteryPackResult {
  const { systemVoltage, chemistry, cellCapacityAh, parallelCount } = inputs;

  // Validation
  if (cellCapacityAh <= 0 || cellCapacityAh > 1000) {
    throw new Error('Cell capacity must be between 1Ah and 1000Ah.');
  }
  if (parallelCount < 1 || parallelCount > 8) {
    throw new Error('Parallel string count must be between 1 and 8.');
  }

  let cellNominalVoltage = 3.2; // LiFePO4
  let seriesCount = 16;

  if (chemistry === 'lifepo4') {
    cellNominalVoltage = 3.2;
    if (systemVoltage === 12) seriesCount = 4;
    else if (systemVoltage === 24) seriesCount = 8;
    else seriesCount = 16;
  } else {
    // NMC (3.7V nominal)
    cellNominalVoltage = 3.7;
    if (systemVoltage === 12) seriesCount = 3; // or 4S depending on inverter window
    else if (systemVoltage === 24) seriesCount = 7;
    else seriesCount = 14;
  }

  const totalCells = seriesCount * parallelCount;
  const nominalVoltage = seriesCount * cellNominalVoltage;
  const totalCapacityAh = cellCapacityAh * parallelCount;
  const totalEnergyKwh = (nominalVoltage * totalCapacityAh) / 1000;
  const usableEnergyKwh = totalEnergyKwh * 0.85; // 85% recommended DoD for longevity

  // Recommended BMS sizing: Continuous current rating should match ~0.5C to 1C
  let bmsCurrent = Math.max(100, Math.min(300, Math.round(totalCapacityAh * 0.75 / 50) * 50));
  if (bmsCurrent < 100) bmsCurrent = 100;
  const recommendedBmsSpec = `JK Smart ${seriesCount}S ${bmsCurrent}A with 1A-2A Active Balancer & Bluetooth`;

  // Weight estimate: prismatic LiFePO4 cells average ~5.4kg per 280Ah cell
  const weightPerCell = cellCapacityAh >= 280 ? 5.4 : (cellCapacityAh / 280) * 5.4;
  const estimatedPackWeightKg = Math.round(totalCells * weightPerCell + 6); // +6kg chassis/busbars

  const safetyNotice = 
    'Indicative engineering sizing only. Always verify cell AC internal resistance (<0.25mΩ) and laser QR batch dates with calibrated YR1035+ meters before assembly. Pack must include Class-T or high-rupture DC fusing.';

  return {
    seriesCount,
    parallelCount,
    totalCells,
    nominalVoltage: Number(nominalVoltage.toFixed(1)),
    totalCapacityAh,
    totalEnergyKwh: Number(totalEnergyKwh.toFixed(2)),
    usableEnergyKwh: Number(usableEnergyKwh.toFixed(2)),
    recommendedBmsSpec,
    estimatedPackWeightKg,
    safetyNotice,
  };
}

/**
 * Deterministic Solar Generator / Load Estimator Engine
 * Conforms to Emax Engineering Protocol (Version 1.2)
 */
export function calculateSolarGenerator(inputs: SolarGeneratorInputs): SolarGeneratorResult {
  const { appliances, autonomyDays = 1, systemVoltage = 48, inverterSurgeMargin = 1.3 } = inputs;

  let totalDailyEnergyWh = 0;
  let peakLoadWatts = 0;

  for (const item of appliances) {
    if (item.quantity > 0 && item.wattage > 0) {
      const itemTotalWatts = item.wattage * item.quantity;
      peakLoadWatts += itemTotalWatts;
      totalDailyEnergyWh += itemTotalWatts * Math.min(24, Math.max(0, item.hoursPerDay));
    }
  }

  const dailyEnergyKwh = Number((totalDailyEnergyWh / 1000).toFixed(2));

  // Inverter Sizing: Peak load with safety headroom (rounded up to standard sizes)
  const requiredInverterWatts = peakLoadWatts * inverterSurgeMargin;
  let recommendedInverterVa = 1000;
  if (requiredInverterWatts > 5000) recommendedInverterVa = 8000;
  else if (requiredInverterWatts > 3500) recommendedInverterVa = 5500;
  else if (requiredInverterWatts > 2000) recommendedInverterVa = 3500;
  else if (requiredInverterWatts > 1000) recommendedInverterVa = 2400;
  else recommendedInverterVa = 1200;

  // Battery Storage Sizing: Daily energy * autonomy days / DoD (0.85) / Inverter efficiency (0.90)
  const systemEfficiency = 0.85 * 0.90; // ~76.5% overall round-trip
  const requiredBatteryKwh = Number(((dailyEnergyKwh * autonomyDays) / systemEfficiency).toFixed(2));
  const recommendedBatteryAh = Math.round((requiredBatteryKwh * 1000) / systemVoltage);

  // PV Solar Array Sizing: Average 4.5 peak sun hours in Lagos, Nigeria
  const peakSunHours = 4.5;
  const pvLossFactor = 1.35; // Dust, temperature de-rating, wire losses
  const recommendedPvWattage = Math.round(((totalDailyEnergyWh / peakSunHours) * pvLossFactor) / 50) * 50;

  const assumptions = [
    `Assumed peak solar insolation: ${peakSunHours} peak sun hours per day in Lagos region.`,
    'Battery storage sized at 85% recommended Depth of Discharge (DoD) for LiFePO4 longevity.',
    `Inverter sizing incorporates a ${(inverterSurgeMargin - 1) * 100}% surge headroom for inductive motor loads (refrigerators, pumps).`,
    'Calculations are indicative for initial system planning; site assessment required before installation.',
  ];

  return {
    dailyEnergyWh: Math.round(totalDailyEnergyWh),
    dailyEnergyKwh,
    peakLoadWatts,
    recommendedInverterVa,
    recommendedBatteryKwh: Math.max(2.5, requiredBatteryKwh),
    recommendedBatteryAh: Math.max(50, recommendedBatteryAh),
    recommendedPvWattage: Math.max(400, recommendedPvWattage),
    assumptions,
  };
}

