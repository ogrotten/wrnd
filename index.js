exports.wrnd = function ({ lower, upper, skewwidth, skewdir, width, dir }) {
	upper += 1

	const randn_bm = (min, max, skew) => {
		var u = 0,
			v = 0;
		while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
		while (v === 0) v = Math.random();
		let num = Math.sqrt(skewwidth * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
		num = num / 10.0 + 0.5; // Translate to 0 -> 1

		if ((num > 1 || num < 0) || u < 0.001) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range

		num = Math.pow(num, skew); // Skew
		num *= max - min; // Stretch to fill range
		num += min; // offset to min
		if (num > max) {
			overmax++
			num = randn_bm(min, max, skew)
		}
		return num;
	}

	const result = Math.round(randn_bm(lower, upper, skewdir));
	console.log(`conlog: `, result)
	return result
}

function denormalize(val, max, min) {
	// convert from the scale [-10 : 10] to the math range
	return (max - min) * ((val + 10) / 20) + min;
}

function normalize(val, max, min) {
	// convert the math range to scale [ 0 : 1 ]
	return (val - min) / (max - min);
}

const figureWidth = {
	normal: -7,
	wide: -11,
	narrow: -3.75
}

const figureDirection = {
	normal: 1,
	low: 1.7,
	high: .5
}

const parms = {
	NORMAL: {
		description: "normal",
		width: -7,
		side: 1
	},
	NORM_LO: {
		description: "normal range, skew low",
		width: -7,
		side: 1.6
	},
	NORM_HI: {
		description: "normal range, skew high",
		width: -7,
		side: 0.6
	},
	WIDE: {
		description: "normal, wide",
		width: -11,
		side: 1
	},
	WIDE_LO: {
		description: "wide range, skew low",
		width: -11,
		side: 1.6
	},
	WIDE_HI: {
		description: "wide range, skew high",
		width: -11,
		side: 0.6
	},
	NARROW: {
		description: "normal, narrow",
		width: -3.75,
		side: 1
	},
	NAR_LO: {
		description: "narrow range, skew low",
		width: -3.75,
		side: 1.6
	},
	NAR_HI: {
		description: "narrow range, skew high",
		width: -3.75,
		side: 0.6
	}
}
