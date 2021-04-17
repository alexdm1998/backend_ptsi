var NewUrl = window.location.href;
var NewUrl = window.location.href + "/request";
var Num_Dim;
var datasets;
fetch(NewUrl).then(
    res => {
        res.json().then(
            data => {
                var newData = JSON.parse(data);
                var dimensions = newData.data.structure.dimensions.series;
                datasets = newData.data.dataSets[0].series;
                var contador = 0;
                Num_Dim = dimensions.length;
                for(var observation in datasets){
                    contador += 1;
                }
                console.log(contador);
                if (dimensions.length > 0) {

                    var temp = "";
                    dimensions.forEach((dimension) => {
                        temp += "<tr>";
                        temp += "<td>" + dimension.id+ "</td>";
                        temp += "<td>" + dimension.name + "</td>";
                        temp += "<td>" + dimension.keyPosition + "</td>";
                        temp += `<td> <select class='select-content' id=Dimension_${dimension.keyPosition} onchange=MonitorValue() multiple>`;
                        temp += `<option value="X" selected>No Filter</option>`;
                        if(dimension.values.length > 0){
                            var IndexValue = 0;
                            dimension.values.forEach(value =>{
                                temp += `<option value=${IndexValue}>` + value.name + "</option>";
                                IndexValue += 1;
                            })
                        }
                        temp +=  "</select></td>";
                        temp += "</tr>";
                    });
                    document.getElementById('data').innerHTML += temp;

                    document.getElementById('total-observations').innerHTML = contador;

                    console.log(datasets);

                  
                }
            }
        )
    }
)



function MonitorValue(){
    var Dim_Values_Array = [];
    for(var i = 0; i < Num_Dim; i++){
        var Dimension_PlaceHolder = $(`#Dimension_${i}`).val();
        var BoolNull = false;
        Dimension_PlaceHolder.forEach(value=>{
            if(value == "null"){
                BoolNull = true;
            }
        })
        if(BoolNull){
            var Dim_KeyPosition_Value = [i,"null"];
        }else{
            var Dim_KeyPosition_Value = [i , Dimension_PlaceHolder];
        }
        Dim_Values_Array.push(Dim_KeyPosition_Value);
    }

    var Dim_Values_String = "";
    for(var k = 1; k <= Dim_Values_Array.length; k++){
        if(k < Dim_Values_Array.length){
            Dim_Values_String += `${Dim_Values_Array[k-1][1][0]}:`; //[1] is temporary, single select
        }else{
            Dim_Values_String += `${Dim_Values_Array[k-1][1][0]}`;
        }
    }
    console.log("String: " + Dim_Values_String);

    FindValues(Dim_Values_String);
}


function FindValues(stringSearch){
    var stringSearchRegex = stringSearch.split(":");
    var FinalArray = [];
    for(var Obs in datasets){
        var ObsArrayValue = Obs.split(":");
        var SameValue = true;
        for(var i = 0; i < stringSearchRegex.length ; i++){
            if(stringSearchRegex[i] == ObsArrayValue[i] || stringSearchRegex[i] == "X"){
                //Do nothing
            }else{
                SameValue = false;
            }
        }

        if(SameValue){
            FinalArray.push(Obs);
        }

       
    }


    var KeyValues = [];
    FinalArray.forEach(FilterObs=>{
        var FilterObsSplit = FilterObs.split(":");
        for(var l = 0; l < FilterObsSplit.length; l++){
            if(KeyValues[l] == undefined){
                KeyValues[l] = [FilterObsSplit[l]];
            }
            else{
                var BoolExist = false;
                KeyValues[l].forEach(KeyNum=>{
                    if(FilterObsSplit[l] == KeyNum){
                        BoolExist = true;
                    }
                })
                if(BoolExist == false){
                    KeyValues[l].push(FilterObsSplit[l]);
                }
            }
        }
    })
    console.log(KeyValues);




    for(var c = 0; c < KeyValues.length; c++){
        var OptionKeyPos = $(`#Dimension_${c}`);
        console.log(OptionKeyPos[0].length);
        var LengthOptions = OptionKeyPos[0].length;
        for(var z = 0; z < LengthOptions; z++){
            var BoolOption = false;
            KeyValues[c].forEach(Num=>{
                if(Num == OptionKeyPos[0][z].value || OptionKeyPos[0][z].value=="X"){
                    BoolOption = true;
                }
            })

            if(BoolOption){
                OptionKeyPos[0][z].disabled = false;
                OptionKeyPos[0][z].hidden = false;
            }else{
                OptionKeyPos[0][z].disabled = true;
                OptionKeyPos[0][z].hidden = true;
            }
        }
    

        
    }
}