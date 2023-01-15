var debug = false;

window.addEventListener("message", e => {
    if (e.data.action == "show") {
        $(".Main").css("display", "flex");
        let data = e.data.data;
        New_Speed(parseInt(data.Speed), parseInt(data.MaxSpeed));
        New_Fuel(parseInt(data.Fuel));
        New_Gage(data.Rpm, 1);
        New_Damage(data.Damage, data.MaxDamage);
        if (data.Lights == 1) {
            $(".Lights-Container").addClass("Active-Control");
        } else {
            $(".Lights-Container").removeClass("Active-Control");
        }
        if (data.Lock != 1) {
            $(".Door-Container").addClass("Active-Control");
        } else {
            $(".Door-Container").removeClass("Active-Control");
        }
        if (data.Belts == true) {
            $(".Belt-Container").addClass("Active-Control");
        } else {
            $(".Belt-Container").removeClass("Active-Control");
        }
    }
    if (e.data.action == "hide") {
        $(".Main").css("display", "none");
    }
})



function New_Speed(Speed, Max_Speed = 300) {

    var New_Speed_Bar = Speed * 100 / Max_Speed;

    // console.log(New_Speed_Bar);
    $(".Speed-Meter-Bar-Val").css("--Rate", New_Speed_Bar);
    $(".Speed-Counter").text(Speed);

    if (Speed <= 9) {
        $(':root').css('--Counter-Zero', '"00"');
    }
    else if (Speed <= 99) {
        $(':root').css('--Counter-Zero', '"0"');
    }
    else if ((Speed > 99) & (Speed < 1000)) {
        $(':root').css('--Counter-Zero', '""');
    }
    else {
        $(':root').css('--Counter-Zero', '"what Da fuck?"');
        // console.log("what Da fuck?");
    }

}

function New_Fuel($Fuel, $Max_Fuel = 100) {

    Fuel_Percentage = ($Fuel * 100) / $Max_Fuel;
    var New_Fuel_Bar = Math.round((Fuel_Percentage * 8) / 100);

    // console.log(New_Fuel_Bar);
    $(".Fuel").attr("data-Fuel", New_Fuel_Bar);
    $(".Fuel-Text").text($Fuel);

}
function New_Gage($Gage, $Max_Gage) {
    // console.log($Gage, $Max_Gage);
    var Gage_Percentage = ($Gage * 100) / $Max_Gage;
    $(".Gage-Meter-Bar-Val").css("--Rate", Gage_Percentage);
}



// New_Damage(600, 1000)


function New_Damage($Damage, $Max_Damage) {
    // var Damage_Percentage = ($Damage * 100) / $Max_Damage;
    var Damage_Percentage2 = ($Damage / $Max_Damage) * 100;
    //Reverse the percentage 
    var Damage_Percentage = 100 - Damage_Percentage2;
    var Damage_Bar;
    if (Damage_Percentage >= 60) {
        Damage_Bar = (((Damage_Percentage - 60) / 40) * 100);
        $(".Damage-Meter-Bar-Val-1").css("--Rate", 100);
        $(".Damage-Meter-Bar-Val-2").css("--Rate", Damage_Bar);
    }
    else if (Damage_Percentage < 60 && Damage_Percentage >= 0) {
        Damage_Bar = ((Damage_Percentage / 60) * 100);
        $(".Damage-Meter-Bar-Val-1").css("--Rate", Damage_Bar);
        $(".Damage-Meter-Bar-Val-2").css("--Rate", 0);
    }
    else {
        $(".Damage-Meter-Bar-Val-1").css("--Rate", 0);
        $(".Damage-Meter-Bar-Val-2").css("--Rate", 0);
    }

}

$(document).on("click", "#Notif-Container", function () {

    $("#Notif-Container").removeClass().addClass("Hide-Notification-PopUp");
    $Is_Notif_On = false;
    clearInterval($Notif_Time);
    /*Back-End I dont know... for example send him to where the notification says... */

});


$(document).ready(function () {

    if (debug) {
        var x = 0;
        var Dir = "Up";
        setInterval(function () {
            New_Speed(x);
            if (Dir == "Up") {
                x++;
            }
            else if (Dir == "Down") {
                x--;
            }
            if (x == 400) {
                Dir = "Down";
            }
            else if (x == 0) {
                Dir = "Up";
            }
        }, 20);

        var x2 = 1;
        var Dir2 = "Up";
        setInterval(function () {
            let Max_Fuel = 100;
            New_Fuel(x2, Max_Fuel);
            if (Dir2 == "Up") {
                x2++;
            }
            else if (Dir2 == "Down") {
                x2--;
            }
            if (x2 == Max_Fuel) {
                Dir2 = "Down";
            }
            else if (x2 == 0) {
                Dir2 = "Up";
            }
        }, 50);


        var x3 = 1;
        var Dir3 = "Up";
        setInterval(function () {
            let Max_Gage = 6;
            New_Gage(x3, Max_Gage);
            if (Dir3 == "Up") {
                x3++;
            }
            else if (Dir3 == "Down") {
                x3--;
            }
            if (x3 == Max_Gage) {
                Dir3 = "Down";
            }
            else if (x3 == 0) {
                Dir3 = "Up";
            }
        }, 500);

        // var x4 = 1;
        // var Dir4 = "Up";
        // setInterval(function () {
        //     let Max_Damage = 1000;
        //     New_Damage(x4, Max_Damage);
        //     if (Dir4 == "Up") {
        //         x4++;
        //     }
        //     else if (Dir4 == "Down") {
        //         x4--;
        //     }
        //     if (x4 == Max_Damage) {
        //         Dir4 = "Down";
        //     }
        //     else if (x4 == 0) {
        //         Dir4 = "Up";
        //     }
        // }, 50);



        setTimeout(function () {
            $(".Door-Container").addClass("Active-Control");
        }, 1000);
        setTimeout(function () {
            $(".Belt-Container").addClass("Active-Control");
        }, 2000);
        setTimeout(function () {
            $(".Lights-Container").addClass("Active-Control");
        }, 3000);
    }

});
