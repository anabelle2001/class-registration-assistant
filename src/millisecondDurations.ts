type timeUnit =
    | 'millisecond'
    | 'milliseconds'
    | 'second'
    | 'seconds'
    | 'minute'
    | 'minutes'
    | 'hour'
    | 'hours'
    | 'day'
    | 'days';

const conversionFactors:{[key in timeUnit]:number} = {
    'millisecond':1,
    'second':1000,
    'minute':6000,
    'hour': 3600000,
    'day': 8.64e+7,

    'milliseconds': 1,
    'seconds': 1000,
    'minutes': 6000,
    'hours': 3600000,
    'days': 8.64e+7,
}

export function inMilliseconds(
    count: number,
    unit: timeUnit,
){
    return count*conversionFactors[unit];
}

/**
 * Returns true iff the duration between timestamp1 and timestamp2 is at least
 * [count] [units]
 * 
 */
export function timeElapsed(
    timestamp1: Date,
    timestamp2: Date,
    count: number,
    unit: timeUnit,
): boolean {
    let actualTimeDelta = Math.abs(timestamp1.getTime()-timestamp2.getTime());
    let desiredTimeDelta = inMilliseconds(count,unit)
    return actualTimeDelta >= desiredTimeDelta;
}