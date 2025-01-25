/* Method #1 */

function onScanSuccess(decodedText, decodedResult) {
	try {
		console.log(decodedResult);
		let p = document.createElement('p');
		p.textContent = 'Code matched = ' + decodedText;
		qrReaderResult.append(p);
		qrScanner.clear();
	} catch(e) {
		console.log(e);
	}
}

function onScanFailure(error) {
	// handle scan failure, usually better to ignore and keep scanning
	// console.log(`Code scan error = ${error}`);
}

let qrScanner = new Html5QrcodeScanner("qrReader", { fps: 24, qrbox: {width: 350, height: 350} }, false);
qrScanner.render(onScanSuccess, onScanFailure);
