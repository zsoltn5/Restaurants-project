
function resetf(){
    document.getElementById("b1").value = "";
    document.getElementById("b2").value = "";
    document.getElementById("b3").value = "";
    document.getElementById("b4").value = "";
    document.getElementById("b5").value = "";
    document.getElementById("b6").value = "";
    document.getElementById("b7").value = "";
    document.getElementById("b8").value = "";
    document.getElementById("b9").value = "";
    location.reload();
}

function checkWinner(){

    var b1, b2, b3, b4, b5, b6, b7, b8, b9;

    b1 = document.getElementById("b1").value;
    b2 = document.getElementById("b2").value;
    b3 = document.getElementById("b3").value;
    b4 = document.getElementById("b4").value;
    b5 = document.getElementById("b5").value;
    b6 = document.getElementById("b6").value;
    b7 = document.getElementById("b7").value;
    b8 = document.getElementById("b8").value;
    b9 = document.getElementById("b9").value;

    const str = ["X","0"];
    const win = 0;

    if ((b1 == 'X' || b1 == '0') && (b2 == 'X' || b2 == '0') && (b3 == 'X' || b3 == '0') && (b4 == 'X' || b4 == '0') && (b5 == 'X' || b5 == '0') && (b6 == 'X' || b6 == '0') && (b7 == 'X' || b7 == '0') && (b8 == 'X' ||b8 == '0') && (b9 == 'X' || b9 == '0')) {
        document.getElementById('turn').innerHTML = "Draw";     
    }else{
        for(const i in str){
            if ((b1 == str[i] && b2 == str[i] && b3 == str[i]) || (b1 == str[i] && b4 == str[i] && b7 == str[i]) || 
                (b7 == str[i] && b8 == str[i] && b9 == str[i]) || (b3 == str[i] && b6 == str[i] && b9 == str[i]) || 
                (b1 == str[i] && b5 == str[i] && b9 == str[i]) || (b3 == str[i] && b5 == str[i] && b7 == str[i]) || 
                (b2 == str[i] && b5 == str[i] && b8 == str[i]) || (b4 == str[i] && b5 == str[i] && b6 == str[i])) {
                    
                document.getElementById('turn').innerHTML = "Player "+ str[i] +" won";
                document.getElementById("b1").disabled = true;
                document.getElementById("b2").disabled = true;
                document.getElementById("b3").disabled = true;
                document.getElementById("b4").disabled = true;
                document.getElementById("b5").disabled = true;
                document.getElementById("b6").disabled = true;
                document.getElementById("b7").disabled = true;
                document.getElementById("b8").disabled = true;
                document.getElementById("b9").disabled = true;
            }
        }
    }
}

jatekos = 1;

function lepes(str) {
    if (jatekos == 1) {
        document.getElementById('turn').innerHTML = "Player 2's turn"
        document.getElementById(str).value = "X";
        document.getElementById(str).disabled = true;
        jatekos = 0;
    }
    else {
        document.getElementById('turn').innerHTML = "Player 1's turn"
        document.getElementById(str).value = "0";
        document.getElementById(str).disabled = true;
        jatekos = 1;
    }
}
