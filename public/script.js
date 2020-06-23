let el = document.querySelector('.hw-item');
let btn = document.querySelector("#btn");

let form = document.querySelector('#hw-form');
let date = document.querySelector("#dt");
let hw = document.querySelector("#hw");

btn.addEventListener('click', function(e) {
	fetch('/data', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},        
		body: JSON.stringify({date: date.valueAsDate})
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
		for (let obj of data)
		{		
			let hwHolder = document.querySelector('.hw-holder');
			let hwItem = document.createElement('div');
			hwItem.setAttribute('class', 'hw-item');

			let hwP = document.createElement('p');
			let cmp = getCMP(obj.deadline, obj.points);
			hwP.textContent = `${obj.title} Deadline: ${obj.deadline} Max points: ${obj.points} | CMP: ${cmp} `;

			hwHolder.appendChild(hwItem);
			hwItem.appendChild(hwP);
		}
	})
	.catch(error => console.log(error));
});

function calcCurrPoint(maxPoints, hoursLate) {
	let currMaxPoints = maxPoints;
	while(hoursLate > 0) {
		currMaxPoints = currMaxPoints * 0.99; 
		hoursLate--;
	}
	return Math.round((currMaxPoints + Number.EPSILON) * 100) / 100;
}

function getCMP(deadline, maxPoints) {
	let currDate = date.valueAsDate; // Date.now();
	console.log(currDate);

	let hoursLate = Math.floor((currDate - Date.parse(deadline)) / 3600000);

	let cmp = calcCurrPoint(maxPoints, hoursLate);
	return cmp;
}


