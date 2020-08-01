import { readFileSync } from 'fs';
import { round } from '../../utilities/math';
import { pivotPortfolioCycles, YearDataColumns } from '../../utilities/util';
import { parseCSVStringToJSON } from '../data-helpers';
import {
  CycleData,
  CyclePortfolio,
  CycleStats,
  getYearIndex,
  MarketYearData,
  PortfolioOptions,
  WithdrawalMethod
} from './portfolio-calc';

const minimalOptions: PortfolioOptions = {
  investmentExpenseRatio: 1,
  equitiesRatio: 1,
  simulationYearsLength: 1,
  startBalance: 1,
  withdrawalMethod: WithdrawalMethod.Nominal,
  withdrawal: { staticAmount: 1 }
};

const starterOptions: PortfolioOptions = {
  startBalance: 1000000,
  equitiesRatio: 0.9,
  investmentExpenseRatio: 0.0025,
  simulationYearsLength: 60,
  withdrawalMethod: WithdrawalMethod.Nominal,
  withdrawal: { staticAmount: 40000 }
};

let fullMarketYearData: MarketYearData[];

beforeAll(async () => {
  const csvString = readFileSync(
    require.resolve('../../../static/jan-shiller-data.csv'),
    {
      encoding: 'utf8'
    }
  );
  fullMarketYearData = parseCSVStringToJSON(csvString);
});

describe('data slicing tests', () => {
  test('slices data for analytics', () => {
    const results: CycleData[] = [
      {
        yearData: [
          {
            cycleYear: 1,
            cycleStartYear: 1,
            cumulativeInflation: 1,
            balanceStart: 1,
            balanceInfAdjStart: 1,
            withdrawal: 1,
            withdrawalInfAdjust: 1,
            startSubtotal: 1,
            equities: 1,
            equitiesGrowth: 1,
            dividendsGrowth: 1,
            bonds: 1,
            bondsGrowth: 1,
            endSubtotal: 1,
            fees: 1,
            balanceEnd: 1,
            balanceInfAdjEnd: 1
          },
          {
            cycleYear: 2,
            cycleStartYear: 2,
            cumulativeInflation: 2,
            balanceStart: 2,
            balanceInfAdjStart: 2,
            withdrawal: 2,
            withdrawalInfAdjust: 2,
            startSubtotal: 2,
            equities: 2,
            equitiesGrowth: 2,
            dividendsGrowth: 2,
            bonds: 2,
            bondsGrowth: 2,
            endSubtotal: 2,
            fees: 2,
            balanceEnd: 2,
            balanceInfAdjEnd: 2
          },
          {
            cycleYear: 3,
            cycleStartYear: 3,
            cumulativeInflation: 3,
            balanceStart: 3,
            balanceInfAdjStart: 3,
            withdrawal: 3,
            withdrawalInfAdjust: 3,
            startSubtotal: 3,
            equities: 3,
            equitiesGrowth: 3,
            dividendsGrowth: 3,
            bonds: 3,
            bondsGrowth: 3,
            endSubtotal: 3,
            fees: 3,
            balanceEnd: 3,
            balanceInfAdjEnd: 3
          }
        ],
        stats: {} as CycleStats
      },
      {
        yearData: [
          {
            cycleYear: 1,
            cycleStartYear: 1,
            cumulativeInflation: 1,
            balanceStart: 1,
            balanceInfAdjStart: 1,
            withdrawal: 1,
            withdrawalInfAdjust: 1,
            startSubtotal: 1,
            equities: 1,
            equitiesGrowth: 1,
            dividendsGrowth: 1,
            bonds: 1,
            bondsGrowth: 1,
            endSubtotal: 1,
            fees: 1,
            balanceEnd: 1,
            balanceInfAdjEnd: 1
          },
          {
            cycleYear: 2,
            cycleStartYear: 2,
            cumulativeInflation: 2,
            balanceStart: 2,
            balanceInfAdjStart: 2,
            withdrawal: 2,
            withdrawalInfAdjust: 2,
            startSubtotal: 2,
            equities: 2,
            equitiesGrowth: 2,
            dividendsGrowth: 2,
            bonds: 2,
            bondsGrowth: 2,
            endSubtotal: 2,
            fees: 2,
            balanceEnd: 2,
            balanceInfAdjEnd: 2
          },
          {
            cycleYear: 3,
            cycleStartYear: 3,
            cumulativeInflation: 3,
            balanceStart: 3,
            balanceInfAdjStart: 3,
            withdrawal: 3,
            withdrawalInfAdjust: 3,
            startSubtotal: 3,
            equities: 3,
            equitiesGrowth: 3,
            dividendsGrowth: 3,
            bonds: 3,
            bondsGrowth: 3,
            endSubtotal: 3,
            fees: 3,
            balanceEnd: 3,
            balanceInfAdjEnd: 3
          }
        ],
        stats: {} as CycleStats
      },
      {
        yearData: [
          {
            cycleYear: 1,
            cycleStartYear: 1,
            cumulativeInflation: 1,
            balanceStart: 1,
            balanceInfAdjStart: 1,
            withdrawal: 1,
            withdrawalInfAdjust: 1,
            startSubtotal: 1,
            equities: 1,
            equitiesGrowth: 1,
            dividendsGrowth: 1,
            bonds: 1,
            bondsGrowth: 1,
            endSubtotal: 1,
            fees: 1,
            balanceEnd: 1,
            balanceInfAdjEnd: 1
          },
          {
            cycleYear: 2,
            cycleStartYear: 2,
            cumulativeInflation: 2,
            balanceStart: 2,
            balanceInfAdjStart: 2,
            withdrawal: 2,
            withdrawalInfAdjust: 2,
            startSubtotal: 2,
            equities: 2,
            equitiesGrowth: 2,
            dividendsGrowth: 2,
            bonds: 2,
            bondsGrowth: 2,
            endSubtotal: 2,
            fees: 2,
            balanceEnd: 2,
            balanceInfAdjEnd: 2
          },
          {
            cycleYear: 3,
            cycleStartYear: 3,
            cumulativeInflation: 3,
            balanceStart: 3,
            balanceInfAdjStart: 3,
            withdrawal: 3,
            withdrawalInfAdjust: 3,
            startSubtotal: 3,
            equities: 3,
            equitiesGrowth: 3,
            dividendsGrowth: 3,
            bonds: 3,
            bondsGrowth: 3,
            endSubtotal: 3,
            fees: 3,
            balanceEnd: 3,
            balanceInfAdjEnd: 3
          }
        ],
        stats: {} as CycleStats
      }
    ];

    const expected: YearDataColumns[] = [
      {
        cycleYear: [1, 2, 3],
        cycleStartYear: [1, 2, 3],
        cumulativeInflation: [1, 2, 3],
        balanceStart: [1, 2, 3],
        balanceInfAdjStart: [1, 2, 3],
        withdrawal: [1, 2, 3],
        withdrawalInfAdjust: [1, 2, 3],
        startSubtotal: [1, 2, 3],
        equities: [1, 2, 3],
        equitiesGrowth: [1, 2, 3],
        dividendsGrowth: [1, 2, 3],
        bonds: [1, 2, 3],
        bondsGrowth: [1, 2, 3],
        endSubtotal: [1, 2, 3],
        fees: [1, 2, 3],
        balanceEnd: [1, 2, 3],
        balanceInfAdjEnd: [1, 2, 3]
      },
      {
        cycleYear: [1, 2, 3],
        cycleStartYear: [1, 2, 3],
        cumulativeInflation: [1, 2, 3],
        balanceStart: [1, 2, 3],
        balanceInfAdjStart: [1, 2, 3],
        withdrawal: [1, 2, 3],
        withdrawalInfAdjust: [1, 2, 3],
        startSubtotal: [1, 2, 3],
        equities: [1, 2, 3],
        equitiesGrowth: [1, 2, 3],
        dividendsGrowth: [1, 2, 3],
        bonds: [1, 2, 3],
        bondsGrowth: [1, 2, 3],
        endSubtotal: [1, 2, 3],
        fees: [1, 2, 3],
        balanceEnd: [1, 2, 3],
        balanceInfAdjEnd: [1, 2, 3]
      },
      {
        cycleYear: [1, 2, 3],
        cycleStartYear: [1, 2, 3],
        cumulativeInflation: [1, 2, 3],
        balanceStart: [1, 2, 3],
        balanceInfAdjStart: [1, 2, 3],
        withdrawal: [1, 2, 3],
        withdrawalInfAdjust: [1, 2, 3],
        startSubtotal: [1, 2, 3],
        equities: [1, 2, 3],
        equitiesGrowth: [1, 2, 3],
        dividendsGrowth: [1, 2, 3],
        bonds: [1, 2, 3],
        bondsGrowth: [1, 2, 3],
        endSubtotal: [1, 2, 3],
        fees: [1, 2, 3],
        balanceEnd: [1, 2, 3],
        balanceInfAdjEnd: [1, 2, 3]
      }
    ];

    expect(pivotPortfolioCycles(results)).toEqual(expected);
  });
});

describe('basic functionality test', () => {
  test('gets year index', () => {
    const portfolioDefaultStart = new CyclePortfolio(fullMarketYearData, {
      ...minimalOptions
    });
    const slicedMarket = fullMarketYearData.slice(119, 140);
    const portfolioCustomStart = new CyclePortfolio(slicedMarket, {
      ...minimalOptions
    });

    expect(portfolioDefaultStart.getYearIndex(1871)).toEqual(0);
    expect(portfolioDefaultStart.getYearIndex(1875)).toEqual(4);
    expect(portfolioCustomStart.getYearIndex(2005)).toEqual(15);
    expect(getYearIndex(slicedMarket, 2005)).toEqual(15);
  });

  test('gets max simulation cycles', () => {
    const longTestData = fullMarketYearData.slice(
      0,
      getYearIndex(fullMarketYearData, 2018) + 1
    );
    const portfolioDefault = new CyclePortfolio(longTestData, {
      ...minimalOptions,
      simulationYearsLength: 3
    });
    const shortTestData = fullMarketYearData.slice(
      getYearIndex(fullMarketYearData, 1990),
      getYearIndex(fullMarketYearData, 2010) + 1
    );
    const portfolioRange = new CyclePortfolio(shortTestData, {
      ...minimalOptions,
      simulationYearsLength: 3
    });

    expect(portfolioDefault.getMaxSimulationCycles()).toEqual(145);
    expect(portfolioRange.getMaxSimulationCycles()).toEqual(18);
  });
});

describe('full cycle portfolio tests against excel data', () => {
  let cycleStats: CycleStats[];
  beforeAll(() => {
    const excelStatsTestSlice = fullMarketYearData.slice(
      getYearIndex(fullMarketYearData, 2013),
      getYearIndex(fullMarketYearData, 2018) + 1
    );
    const infAdjPortfolio = new CyclePortfolio(excelStatsTestSlice, {
      ...starterOptions,
      simulationYearsLength: 3,
      withdrawalMethod: WithdrawalMethod.InflationAdjusted
    });
    const results = infAdjPortfolio.crunchAllCyclesData();

    cycleStats = infAdjPortfolio.crunchAllPortfolioStats(
      results.portfolioLifecyclesData
    );
  });

  test('calculates each type of cycle-level statistic correctly', () => {
    const firstCycleStats = cycleStats[0];

    expect(round(firstCycleStats.fees, 4)).toEqual(9124.9341);
    expect(round(firstCycleStats.balance.averageInflAdj, 4)).toEqual(
      1201199.3865
    );
    expect(round(firstCycleStats.withdrawals.median, 4)).toEqual(40595.2753);
    expect(round(firstCycleStats.balance.ending, 4)).toEqual(1192323.1914);
  });

  // test('calculates a 3 year cycle length portfolio with correct portfolio stats', () => {
  //   const testSlice = fullMarketYearData.slice(
  //     getYearIndex(fullMarketYearData, 2013),
  //     getYearIndex(fullMarketYearData, 2018) + 1
  //   );
  //   const portfolio = new CyclePortfolio(testSlice, {
  //     ...starterOptions,
  //     withdrawalMethod: WithdrawalMethod.PercentPortfolio,
  //     withdrawal: { percentage: 0.04 },
  //     simulationYearsLength: 3
  //   });
  //   const data = portfolio.crunchAllCyclesData();

  //   expect(data.portfolioStats.numSuccesses).toEqual(3);
  //   expect(data.portfolioStats.numFailures).toEqual(0);
  //   expect(data.portfolioStats.successRate).toEqual(1);

  //   expect(round(data.portfolioStats.equitiesPriceChange.average, 4)).toEqual(
  //     257618.0269
  //   );
  //   expect(round(data.portfolioStats.equitiesPriceChange.median, 4)).toEqual(
  //     255391.5826
  //   );

  //   expect(round(data.portfolioStats.equitiesDividendsPaid.average, 4)).toEqual(
  //     55998.9807
  //   );
  //   expect(round(data.portfolioStats.equitiesDividendsPaid.median, 4)).toEqual(
  //     54639.1744
  //   );

  //   expect(
  //     round(data.portfolioStats.fixedIncomeInterestPaid.average, 4)
  //   ).toEqual(6725.8244);
  //   expect(
  //     round(data.portfolioStats.fixedIncomeInterestPaid.median, 4)
  //   ).toEqual(6689.0733);

  //   expect(round(data.portfolioStats.investmentExpenses.average, 4)).toEqual(
  //     8403.9217
  //   );
  //   expect(round(data.portfolioStats.investmentExpenses.median, 4)).toEqual(
  //     8097.6148
  //   );

  //   expect(round(data.portfolioStats.balance.average, 4)).toEqual(1185221.1664);
  //   expect(round(data.portfolioStats.balance.averageInflAdj, 4)).toEqual(
  //     1159104.0942
  //   );
  //   expect(round(data.portfolioStats.balance.median, 4)).toEqual(1175670.6063);
  //   expect(round(data.portfolioStats.balance.medianInflAdj, 4)).toEqual(
  //     1158430.9722
  //   );
  //   expect(round(data.portfolioStats.balance.min.balance, 4)).toEqual(
  //     1138157.6624
  //   );
  //   expect(data.portfolioStats.balance.min.year).toEqual(2014);
  //   expect(round(data.portfolioStats.balance.min.balanceInflAdj, 4)).toEqual(
  //     1123745.4953
  //   );
  //   expect(data.portfolioStats.balance.min.yearInflAdj).toEqual(2014);
  //   expect(round(data.portfolioStats.balance.max.balance, 4)).toEqual(
  //     1241835.2306
  //   );
  //   expect(data.portfolioStats.balance.max.year).toEqual(2015);
  //   expect(round(data.portfolioStats.balance.max.balanceInflAdj, 4)).toEqual(
  //     1195135.8152
  //   );
  //   expect(data.portfolioStats.balance.max.yearInflAdj).toEqual(2015);

  //   expect(round(data.portfolioStats.withdrawals.average, 4)).toEqual(
  //     42239.248
  //   );
  //   expect(round(data.portfolioStats.withdrawals.averageInflAdj, 4)).toEqual(
  //     41790.5651
  //   );
  //   expect(round(data.portfolioStats.withdrawals.median, 4)).toEqual(
  //     42358.2192
  //   );
  //   expect(round(data.portfolioStats.withdrawals.medianInflAdj, 4)).toEqual(
  //     42114.3091
  //   );
  //   expect(round(data.portfolioStats.withdrawals.min.amount, 4)).toEqual(
  //     37191.5824
  //   );
  //   expect(data.portfolioStats.withdrawals.min.cycleStartYear).toEqual(2015);
  //   expect(data.portfolioStats.withdrawals.min.yearInCycle).toEqual(2016);
  //   expect(round(data.portfolioStats.withdrawals.min.amountInflAdj, 4)).toEqual(
  //     36687.8267
  //   );
  //   expect(data.portfolioStats.withdrawals.min.cycleStartYearInflAdj).toEqual(
  //     2015
  //   );
  //   expect(data.portfolioStats.withdrawals.min.yearInCycleInflAdj).toEqual(
  //     2016
  //   );
  //   expect(round(data.portfolioStats.withdrawals.max.amount, 4)).toEqual(
  //     50577.9224
  //   );
  //   expect(data.portfolioStats.withdrawals.max.cycleStartYear).toEqual(2013);
  //   expect(data.portfolioStats.withdrawals.max.yearInCycle).toEqual(2015);
  //   expect(round(data.portfolioStats.withdrawals.max.amountInflAdj, 4)).toEqual(
  //     49836.2649
  //   );
  //   expect(data.portfolioStats.withdrawals.max.cycleStartYearInflAdj).toEqual(
  //     2013
  //   );
  //   expect(data.portfolioStats.withdrawals.max.yearInCycleInflAdj).toEqual(
  //     2015
  //   );
  // });

  // test('calculates max length single cycle nominal withdrawal', () => {
  //   const longTestData = fullMarketYearData.slice(
  //     0,
  //     getYearIndex(fullMarketYearData, 2018) + 1
  //   );

  //   const portfolio = new CyclePortfolio(longTestData, {
  //     ...starterOptions,
  //     simulationYearsLength: getMaxSimulationLength(longTestData),
  //     withdrawalMethod: WithdrawalMethod.Nominal
  //   });

  //   const data = portfolio.crunchSingleCycleData();

  //   // We need to apply a tiny error tolerance due to tiny fractional number handling differences with excel
  //   const percentErrorTolerance = 0.00000000001;
  //   const expectedEnding = 39773480353.0365;
  //   const expectedEndingInflAdj = 2041431119.6567;

  //   expect(round(data.stats.balance.ending, 4)).toBeGreaterThanOrEqual(
  //     expectedEnding - expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.ending, 4)).toBeLessThanOrEqual(
  //     expectedEnding + expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.endingInflAdj, 4)).toBeGreaterThanOrEqual(
  //     expectedEndingInflAdj - expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.endingInflAdj, 4)).toBeLessThanOrEqual(
  //     expectedEndingInflAdj + expectedEnding * percentErrorTolerance
  //   );
  // });

  // test('calculates max length single cycle inflation adjusted withdrawal', () => {
  //   const longTestData = fullMarketYearData.slice(
  //     0,
  //     getYearIndex(fullMarketYearData, 2018) + 1
  //   );

  //   const portfolio = new CyclePortfolio(longTestData, {
  //     ...starterOptions,
  //     simulationYearsLength: getMaxSimulationLength(longTestData),
  //     withdrawalMethod: WithdrawalMethod.InflationAdjusted
  //   });

  //   const data = portfolio.crunchSingleCycleData();

  //   // We need to apply a tiny error tolerance due to tiny fractional number handling differences with excel
  //   const percentErrorTolerance = 0.00000000001;
  //   const expectedEnding = 56148384301.9503;
  //   const expectedEndingInflAdj = 2881896630.9971;

  //   expect(round(data.stats.balance.ending, 4)).toBeGreaterThanOrEqual(
  //     expectedEnding - expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.ending, 4)).toBeLessThanOrEqual(
  //     expectedEnding + expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.endingInflAdj, 4)).toBeGreaterThanOrEqual(
  //     expectedEndingInflAdj - expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.endingInflAdj, 4)).toBeLessThanOrEqual(
  //     expectedEndingInflAdj + expectedEnding * percentErrorTolerance
  //   );
  // });

  // test('calculates max length single cycle percent withdrawal', () => {
  //   const longTestData = fullMarketYearData.slice(
  //     0,
  //     getYearIndex(fullMarketYearData, 2018) + 1
  //   );

  //   const portfolio = new CyclePortfolio(longTestData, {
  //     ...starterOptions,
  //     simulationYearsLength: getMaxSimulationLength(longTestData),
  //     withdrawalMethod: WithdrawalMethod.PercentPortfolio,
  //     withdrawal: { percentage: 0.04 }
  //   });

  //   const data = portfolio.crunchSingleCycleData();

  //   // We need to apply a tiny error tolerance due to tiny fractional number handling differences with excel
  //   const percentErrorTolerance = 0.00000000001;
  //   const expectedEnding = 312889323.3471;
  //   const expectedEndingInflAdj = 16059494.8197;

  //   expect(round(data.stats.balance.ending, 4)).toBeGreaterThanOrEqual(
  //     expectedEnding - expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.ending, 4)).toBeLessThanOrEqual(
  //     expectedEnding + expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.endingInflAdj, 4)).toBeGreaterThanOrEqual(
  //     expectedEndingInflAdj - expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.endingInflAdj, 4)).toBeLessThanOrEqual(
  //     expectedEndingInflAdj + expectedEnding * percentErrorTolerance
  //   );
  // });

  // test('calculates max length single cycle clamped percent withdrawal', () => {
  //   const longTestData = fullMarketYearData.slice(
  //     0,
  //     getYearIndex(fullMarketYearData, 2018) + 1
  //   );

  //   const portfolio = new CyclePortfolio(longTestData, {
  //     ...starterOptions,
  //     simulationYearsLength: getMaxSimulationLength(longTestData),
  //     withdrawalMethod: WithdrawalMethod.PercentPortfolioClamped,
  //     withdrawal: { percentage: 0.04, floor: 30000, ceiling: 60000 }
  //   });

  //   const data = portfolio.crunchSingleCycleData();

  //   // We need to apply a tiny error tolerance due to tiny fractional number handling differences with excel
  //   const percentErrorTolerance = 0.00000000001;
  //   const expectedEnding = 33505765577.3321;
  //   const expectedEndingInflAdj = 1719731638.528;

  //   expect(round(data.stats.balance.ending, 4)).toBeGreaterThanOrEqual(
  //     expectedEnding - expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.ending, 4)).toBeLessThanOrEqual(
  //     expectedEnding + expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.endingInflAdj, 4)).toBeGreaterThanOrEqual(
  //     expectedEndingInflAdj - expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.endingInflAdj, 4)).toBeLessThanOrEqual(
  //     expectedEndingInflAdj + expectedEnding * percentErrorTolerance
  //   );
  // });

  // test('calculates max length single cycle clamped percent withdrawal edge test', () => {
  //   const longTestData = fullMarketYearData.slice(
  //     0,
  //     getYearIndex(fullMarketYearData, 2018) + 1
  //   );

  //   const portfolio = new CyclePortfolio(longTestData, {
  //     startBalance: 800000,
  //     investmentExpenseRatio: 0.019,
  //     equitiesRatio: 0.75,
  //     simulationYearsLength: getMaxSimulationLength(longTestData),
  //     withdrawalMethod: WithdrawalMethod.PercentPortfolioClamped,
  //     withdrawal: { percentage: 0.07, floor: 20000, ceiling: 50000 }
  //   });

  //   const data = portfolio.crunchSingleCycleData();

  //   // We need to apply a tiny error tolerance due to tiny fractional number handling differences with excel
  //   const percentErrorTolerance = 0.00000000001;
  //   const expectedEnding = -295131798.2325;
  //   const expectedEndingInflAdj = -15148064.2872;

  //   // Note, testing negative numbers, reverse tolerance operation (+/-)
  //   expect(round(data.stats.balance.ending, 4)).toBeGreaterThanOrEqual(
  //     expectedEnding + expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.ending, 4)).toBeLessThanOrEqual(
  //     expectedEnding - expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.endingInflAdj, 4)).toBeGreaterThanOrEqual(
  //     expectedEndingInflAdj + expectedEnding * percentErrorTolerance
  //   );
  //   expect(round(data.stats.balance.endingInflAdj, 4)).toBeLessThanOrEqual(
  //     expectedEndingInflAdj - expectedEnding * percentErrorTolerance
  //   );
  // });
});
