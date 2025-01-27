/* Method #1 */
/*
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
*/

/* Method #2 */

const qrScanner = new Html5Qrcode("qrReader");

const config = {
	qrScan: {
		fps: 30,
		qrbox: {
			width: 250,
			height: 250
		},
		supportedScanTypes: [ Html5QrcodeScanType.SCAN_TYPE_CAMERA ]
	}
};

const scanResult = {};

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
	try {
		console.log(decodedResult);
		scanResult.result = decodedResult.result;
		printContent(decodedText, decodedResult);
		qrScanner.pause();
	} catch(e) {
		console.log(e);
	}
};

qrScanner.start({ facingMode: "environment" }, config.qrScan, qrCodeSuccessCallback);

qrReaderResult.animation = () => {
	if (qrReaderResult.className === 'result-show') {
		qrReaderResult.className = 'result-hide';
		shade.className = 'hide';
		qrScanner.resume();
	} else {
		qrReaderResult.className = 'result-show';
		shade.className = 'shade';
	}
}

const printContent = (decodedText, decodedResult) => {
	try {
		resultHeader.innerHTML = '';
		resultContent.innerHTML = '';

		let h = document.createElement('h1');
		h.textContent = 'New ' + decodedResult.result.format.formatName + ' detected!';
		resultHeader.append(h);

		let p = document.createElement('p');
		p.textContent = "Text:\n" + decodedText;
		resultContent.append(p);

		qrReaderResult.animation();
	} catch(e) {
		console.log(e);
	}
};

const shareContent = () => {
	if (navigator.share) {
		navigator.share({
			title: scanResult.result.format.formatName,
			text: scanResult.result.text
		})
		.then(() => alert('Successful share'))
		.catch((e) => console.log('Error sharing', e));
	}
}

const copyContent = () => {
	navigator.clipboard.writeText(scanResult.result.text)
		.then(() => alert('Successful copy'))
		.catch((e) => console.log('Error copying', e));
}


const actionOnClick = (elem) => {
	try {

		switch(elem.id) {
			case 'share':
				shareContent();
				break;

			case 'copy':
				copyContent();
				break;

			default:
				break;
		}

	} catch(e) {
		console.log(e);
	}
}
