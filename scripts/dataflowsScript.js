var Num_Dim;
var datasets;
fetch(`${window.location.href}/request`).then(
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
                }
            }
        )
    }
)



//Reads multiple values of select
function MonitorValue(){
    var DimensionsObj={}
    for(var i = 0; i < Num_Dim; i++){
        var Dimension_Values = $(`#Dimension_${i}`).val();
        Dimension_Values.forEach(val=>{
            if(val == "X"){
                Dimension_Values = ["X"];
            }
        })
        var Dimension_Index = `Dimension_${i}`;
        DimensionsObj[Dimension_Index] = Dimension_Values;
    }
    FindValues(DimensionsObj);
}


//Finds Values with filter
function FindValues(Json_Filter_Dimensions){
    var NumDims = 0;
    var VerifiedArray = {};
    for(Dims in Json_Filter_Dimensions){NumDims += 1;} //Count dims

    for(DimValArray in Json_Filter_Dimensions){ //Create Json Skeleton
        var Pos = DimValArray.split("_")[1];
        VerifiedArray[DimValArray] = {};
        for(var i = 0; i < NumDims; i++){
            if(i != Pos){
                VerifiedArray[DimValArray][`Index_${i}`] = [];
            }
        }
    }

    for(ArrayVal in Json_Filter_Dimensions){ //Get filter for each dimension
        var DimPos = ArrayVal.split("_")[1];
        for(Obs in datasets){
            var Array_Obs = Obs.split(":");
            if(Json_Filter_Dimensions[`Dimension_${DimPos}`].some(Val => Val == Array_Obs[DimPos] || Val == "X")){
                for(var w = 0; w < NumDims; w++){
                    if(w != DimPos && !(VerifiedArray[`Dimension_${DimPos}`][`Index_${w}`].includes(Array_Obs[w]))){
                        VerifiedArray[`Dimension_${DimPos}`][`Index_${w}`].push(Array_Obs[w]);
                    }
                }
            }
        }
    }


    var FinalArray = {};
    for(var j = 0; j < Num_Dim; j++){ //Get the intersection of all arrays
        var FilteredArray = [];
        for(var k = 0; k < Num_Dim; k++){
            if(k != j){
                if(FilteredArray.length == 0){
                    FilteredArray = VerifiedArray[`Dimension_${k}`][`Index_${j}`];
                }else{
                    FilteredArray = FilteredArray.filter(value => VerifiedArray[`Dimension_${k}`][`Index_${j}`].includes(value));
                }
            }
        }
        FinalArray[`Dimension_${j}`] = FilteredArray;
    }

    DisableOptions(FinalArray);
}


function DisableOptions(FilterArray){
    for(var i = 0; i < Num_Dim; i++){
        var Select_Dimension = $(`#Dimension_${i}`);

        for(var k = 0; k < Select_Dimension[0].length; k++){
            if(FilterArray[`Dimension_${i}`].includes(Select_Dimension[0][k].value) || Select_Dimension[0][k].value == "X"){
                Select_Dimension[0][k].disabled = false;
                Select_Dimension[0][k].hidden = false;
            }else{
                Select_Dimension[0][k].disabled = true;
                Select_Dimension[0][k].hidden = true;
            }
        }
    }
}
