function clickHome(path){
    if(path==='')return;
    window.location.href = '/'+path;
}
function clickHomeBack(){
    let i=-1;
    while(document.referrer=== window.location.host){
        i-=1;
    }
    window.history.go(i);
}

function searchIntro(e){
    if(e.which===13) {
        let paths = [
            'lights',
            'antilockWarning','batteryLow','checkEngine','brakeSystemWarning',
            'lowOilWarning','lowFuelWarning','lowWiperFluidWarning','temperatureWarning','tirePressureWarning',
            'tractionControlIndicator','cruiseControlIndicator','ignitionSwitchWarning','steeringLockWarning',
            'doorOpenWarning','seatBeltWarning',
            'smell',
            'rottenEgg','gas','burnt','mold','syrup','hotOil',
            'smoke',
            'blackSmoke','whiteSmoke',
            'sound',
            'clunking','flapping','grind','sizzling','knocking','bang',
            'shake',
            'imbalancedTires','sparkPlugs','brakePads','brakeCalipers','axles',
        ];
        if(paths.indexOf(e.target.value)!== -1){
            window.location.href = '/' + e.target.value;
        }else{
            $('#alert-placeholder').html(`
            <div class="alert alert-warning" style="display: block">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Not found!</strong>
            </div>
            `)
        }
    }
}

