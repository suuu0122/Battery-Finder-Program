// バッテリー
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }];

// カメラ
const camera = [{
		"brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }];

// カメラブランドを返す関数
function getBrandKinds()
{
	let brandKinds = [];

	for (let i = 0; i < camera.length; i++) {
		let brand = camera[i]["brand"];

		if (!brandKinds.includes(brand))
			brandKinds.push(brand);
	}

	return brandKinds;
}

// カメラブランドの各モデルを返す関数
function getModelKinds(cameraBrand)
{
	let modelKinds = [];

	for (let i = 0; i < camera.length; i++) {
		if (camera[i]["brand"] === cameraBrand) {
			model = camera[i]["model"];
			if (!modelKinds.includes(model))
				modelKinds.push(model);
		}
	}

	return modelKinds;
}

// カメラモデルの消費電力を返す関数
function getCameraPowerConsumption(cameraBrand, cameraBrandModel)
{
	for (let i = 0; i < camera.length; i++) {
		if ((camera[i]["brand"] === cameraBrand) && (camera[i]["model"] === cameraBrandModel))
			return camera[i]["powerConsumptionWh"];
	}
}

// 使用可能なバッテリーと持ち時間を返す関数
function getCanUseBattery(cameraBrand, cameraBrandModel, accessoryPowerConsumption)
{
	let canUseBattery = [];

	for (let i = 0; i < battery.length; i++) {
		let canUseBatteryAndEstimateHours = [];
		let batteryPowerConsumption = battery[i]["endVoltage"] * battery[i]["maxDraw"];
		let cameraPowerConsumption = getCameraPowerConsumption(cameraBrand, cameraBrandModel);
		let totalPowerConsumption = cameraPowerConsumption + accessoryPowerConsumption;

		if (batteryPowerConsumption >= totalPowerConsumption) {
			let fullyChargedBatteryCapacity = battery[i]["voltage"] * battery[i]["capacityAh"];

			canUseBatteryAndEstimateHours.push(battery[i]["batteryName"]);
			canUseBatteryAndEstimateHours.push(Math.round(fullyChargedBatteryCapacity / totalPowerConsumption * 10) / 10);
			canUseBattery.push(canUseBatteryAndEstimateHours);
		}
	}

	return canUseBattery;
}

// Step1のブランドのオプションのHTMLを作成して返す関数
function getHtmlBrandSelect()
{
	let brandKinds = getBrandKinds();
	let brandSelectSection = '';

	for (let i = 0; i < brandKinds.length; i++)
	{
		brandSelectSection +=
		`
			<option value="${brandKinds[i]}">${brandKinds[i]}</option>
		`
	}

	return brandSelectSection;
}

// Step1のselectタグのHTML作成
document.getElementById("brandSelect").innerHTML = getHtmlBrandSelect();

// Step2のカメラブランドのモデルのオプションのHTMLを作成して返す関数
function getHtmlModelSelect(cameraBrand)
{
	let modelKinds = getModelKinds(cameraBrand);
	let modleSelectSection = '';

	for (let i = 0; i < modelKinds.length; i++) {
		modleSelectSection += 
		`
			<option value="${modelKinds[i]}">${modelKinds[i]}</option>
		`
	}

	return modleSelectSection;
}

// Step4の使用可能バッテリーのHTMLを作成して返す関数
function getHtmlCanUseBattery(cameraBrand, cameraBrandModel, accessoryPowerConsumption)
{
	let batterySection =
	`
		<tr class="bg-primary text-center rem1p5">
			<th scope="col" class="text-white">Battery Name</th>
			<th scope="col" class="text-white">Estimate Hours</th>
		</tr>
	`;
	let canUseBattery = getCanUseBattery(cameraBrand, cameraBrandModel, accessoryPowerConsumption);

	for (let i = 0; i < canUseBattery.length; i++) {
		batterySection +=
		`
			<tr class="bg-gray text-center text-bold rem1p2">
				<td>${canUseBattery[i][0]}</td>
				<td>${canUseBattery[i][1]}</td>
			</tr>
		`
	}

	return batterySection;
}

// Step2のselectタグの初期HTML作成
let brandSelect = document.getElementById("brandSelect");
document.getElementById("modelSelect").innerHTML = getHtmlModelSelect(brandSelect.value);

// Step4の使用可能バッテリーの初期HTML作成
let modelSelect = document.getElementById("modelSelect");
let powerConsumptionInput = document.getElementById("powerConsumption");
document.getElementById("batterySection").innerHTML = getHtmlCanUseBattery(brandSelect.value, modelSelect.value, parseInt(powerConsumptionInput.value));

// Step1,2,3の変更時にHTML更新
document.addEventListener("DOMContentLoaded", function(){
	let brandSelect = document.getElementById("brandSelect");
	let modelSelect = document.getElementById("modelSelect");
	let powerConsumptionInput = document.getElementById("powerConsumption");

	// Step1変更時にStep2,4のHTML更新
	brandSelect.addEventListener("change", function(){
		document.getElementById("modelSelect").innerHTML = getHtmlModelSelect(brandSelect.value);
		let modelSelect = document.getElementById("modelSelect");
		document.getElementById("batterySection").innerHTML = getHtmlCanUseBattery(brandSelect.value, modelSelect.value, parseInt(powerConsumptionInput.value));
	}, false);

	// Step2変更時にStep4のHTML更新
	modelSelect.addEventListener("change", function(){
		document.getElementById("batterySection").innerHTML = getHtmlCanUseBattery(brandSelect.value, modelSelect.value, parseInt(powerConsumptionInput.value));
	}, false);

	// Step3変更時にStep4のHTML更新
	powerConsumptionInput.addEventListener("change", function(){
		document.getElementById("batterySection").innerHTML = getHtmlCanUseBattery(brandSelect.value, modelSelect.value, parseInt(powerConsumptionInput.value));
	}, false);
}, false);