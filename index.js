exports.wrnd = function (lower, upper, skewwidth, skewdir) {

	let overmax = 0

	const randn_bm = (min, max, skew) => {
		var u = 0,
			v = 0;
		while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
		while (v === 0) v = Math.random();
		let num = Math.sqrt(skewwidth * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
		num = num / 10.0 + 0.5; // Translate to 0 -> 1
		if (num > max) {
		}

		if ((num > 1 || num < 0) || u < 0.001) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range

		num = Math.pow(num, skew); // Skew
		num *= max - min; // Stretch to fill range
		num += min; // offset to min
		if (num > max) {
			overmax++
			// console.error(`PROBLEM >>> items.js 44 ${num} > ${max}`)
			num = randn_bm(min, max, skew)
		}
		return num;
	}

	if (overmax > 0) {
		// console.error(`PROBLEM >>> items.js 51 overmax ${overmax}`)
	}

	const result = Math.round(randn_bm(lower, upper, skewdir));
	console.log(`conlog: `, result)
	return result
}
