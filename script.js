var apiData = [];
function getTableData() {
    var param = document.getElementById('searchBox').value;
    console.log(param);
    if (param.length > 1) {
        alert('Enter only first letter to search')
        return;
    }
    var tableData ='';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${param}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        apiData = data.meals;
        if (data.meals) {
            data.meals.forEach((item) => {
                tableData += '<tr>';
                tableData += '<td class="hide">' + item.strCategory + '</td>';
                tableData += '<td class="hide">' + item.strArea + '</td>';
                tableData += '<td>' + item.strMeal + '</td>';
                tableData += '<td><button key=' + item.idMeal + ' onclick="getRecipe(' + item.idMeal + ')"  class="btn btn-warning">See Recipe</button></td>';
                tableData += '</tr>';
            })
            document.getElementById('tbody').innerHTML = tableData;
        } else  {
            tableData += '<tr>';
            tableData += '</tr>';
            document.getElementById('tbody').innerHTML = tableData;
        }
    })
    .catch((error) => {
        console.log(error);
    })

}

function getRecipe(id) {
    const value = apiData.filter((item) => {
        return (id == item.idMeal);
    });
    const image = value[0].strMealThumb || './notAvailable.png';
    var recipe = '';
    recipe += '<div>';
    recipe += '<h3 class="display-4">Recipe</h3>';
    recipe += '<h6 style="font-weight: bold">' + value[0].strMeal+ '</h3>';
    recipe += '<img src=' + image  + ' width="100%" alt="Sorry image not available"></img>';
    recipe += '<p style="font-weight: 400">' + value[0].strInstructions + '</p>';
    recipe += '</div>';
    document.getElementById('recipe').innerHTML = recipe;
}
