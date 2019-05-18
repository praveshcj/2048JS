const length_of_grid =4;
var grid_array =[];
var grid_array_id= [];
var totalScore =0;
function initialize_grid()
{
  if(document.getElementById("myTable")!==null) grid_array = [];
  for(var i=0;i<length_of_grid;i++)
  {
    var row_array =[];
    for(var j=0;j<length_of_grid;j++)
    {
      row_array.push(0);
      grid_array_id.push([i,j]);
    }
    grid_array.push(row_array);
  }
  var first_randIndex = Math.floor(Math.random()*16);
  var second_randIndex= Math.floor(Math.random()*16);
  while(first_randIndex=== second_randIndex)
  {
    first_randIndex = Math.floor(Math.random()*16);
    second_randIndex= Math.floor(Math.random()*16);
  }
  grid_array[grid_array_id[first_randIndex][0]][grid_array_id[first_randIndex][1]]= (Math.random()>0.5)?2:4;
  grid_array[grid_array_id[second_randIndex][0]][grid_array_id[second_randIndex][1]]= (Math.random()>0.5)?2:4;
  console.log(first_randIndex);
  console.log(second_randIndex);
  create_grid();
}
initialize_grid();
function create_grid()
{
  if(document.getElementById("new_game_button")!==null)
    document.getElementById("new_game_button").outerHTML = "";
  var new_game_button = document.createElement('button');
  {
        new_game_button.setAttribute("onclick","initialize_grid();");
        new_game_button.setAttribute("class","btn btn-primary");
        new_game_button.setAttribute("id","new_game_button");
        new_game_button.innerHTML = "New Game";
        new_game_button.setAttribute("style","margin-left:100px;margin-top:80px;")
      }
  document.getElementById('grid').appendChild(new_game_button);
  if(document.getElementById("score_label")!==null)
    document.getElementById("score_label").outerHTML = "";
  var score_label = document.createElement('LABEL');
  {
        score_label.setAttribute("class","label lable-primary");
        score_label.setAttribute("id","score_label");
        score_label.innerHTML = "Score: "+totalScore;
        score_label.setAttribute("style","margin-left:250px;margin-top:100px;background-color: blue;");

      }
  document.getElementById('grid').appendChild(score_label);
  if(document.getElementById("myTable")!==null)
      document.getElementById("myTable").outerHTML = "";
  var myTable = document.createElement("TABLE");
  myTable.setAttribute("id", "myTable");
  myTable.setAttribute('style',"border: solid 2px lightgrey; ");
  document.getElementById('grid').appendChild(myTable);
  var counter_for_id = 0;
  for(let i=0;i<length_of_grid;i++)
  {
    let myRow = document.createElement("TR");
    myRow.setAttribute("id", "myTr");
    document.getElementById("myTable").appendChild(myRow);
    for(let j=0;j<length_of_grid;j++)
    {
      counter_for_id ++;
      let myCell = document.createElement("TD");
      console.log(grid_array[i][j]);
      let cellContent = document.createElement("div");
      cellContent.setAttribute("id",`$${i}${j}`);
      if(grid_array[i][j]!==0)
      {
        var colorValues = createColor(grid_array[i][j]);
        cellContent.setAttribute("style",`background-color: rgb(${colorValues[0]},${colorValues[1]},${colorValues[2]}); width:100px;height:100px`);
        let cellText = document.createElement("p");
        let num_digits = Math.ceil(Math.log10(grid_array[i][j]));
        let fontSize =(num_digits>2)?30:35;
        cellText.setAttribute("style", "padding: 25px;  margin-left:3px;font-size:"+fontSize+"px;");
        cellText.innerHTML = ""+ grid_array[i][j];
        cellContent.appendChild(cellText);
      }
      myCell.appendChild(cellContent);
      // myCell.setAttribute("id",`${i}${j}`);
      myCell.setAttribute('style',"border: solid 2px lightgrey;");
      myRow.appendChild(myCell);
    }
  }
}

function logKey(e)
{
  if(`${e.code}`==='ArrowLeft')
  {
    lKeyPressed();
  }
  else if(`${e.code}`==='ArrowRight')
  {
    rKeyPressed();
  }
  else if (`${e.code}`==='ArrowUp')
  {
    uKeyPressed();
  }
  else if(`${e.code}`==='ArrowDown')dKeyPressed();
}
document.addEventListener('keydown', logKey);

function lKeyPressed()
{
  console.log("Left key pressed");
  for(let i =0;i<length_of_grid;i++)
  {
    let temp_array=[];
    let temp_array_sum=[];

    for(let j=0;j<length_of_grid;j++)
    {
      if(grid_array[i][j]!==0)
      {
        temp_array.push(grid_array[i][j]);
      }
    }
    for(let j=temp_array.length;j<length_of_grid;j++)
    {
      temp_array.push(0);
    }
    for(let j=0;j<temp_array.length;j++)
    {
      if(temp_array[j]===temp_array[j+1])
      {
        temp_array_sum.push(temp_array[j]+temp_array[j+1]);
        j++;
      }
      else {
        temp_array_sum.push(temp_array[j]);
      }
    }
    console.log(temp_array_sum);

    for(let j=temp_array_sum.length;j<length_of_grid;j++)
    {
      temp_array_sum.push(0);
    }
    console.log(temp_array_sum);
    grid_array[i] = temp_array_sum;
    grid_array[i].length = length_of_grid;
  }

  randomDigit();
  // left_animation();
  create_grid();
}

function rKeyPressed()
{
  var counter =0;
  console.log("Right key pressed");
  for(let i =0;i<length_of_grid;i++)
  {
    let temp_array=[];
    let temp_array_sum=[];
    grid_array[i].reverse();
    for(let j=0;j<length_of_grid;j++)
    {
      if(grid_array[i][j]!==0)
      {
        temp_array.push(grid_array[i][j]);
      }
    }
    for(let j=temp_array.length;j<length_of_grid;j++)
    {
      temp_array.push(0);
    }
    for(let j=0;j<temp_array.length;j++)
    {
      if(temp_array[j]===temp_array[j+1])
      {
        temp_array_sum.push(temp_array[j]+temp_array[j+1]);
        j++;
      }
      else {
        temp_array_sum.push(temp_array[j]);
      }
    }
    console.log(temp_array_sum);

    for(let j=temp_array_sum.length;j<length_of_grid;j++)
    {
      temp_array_sum.push(0);
    }
    console.log(temp_array_sum);
    for(let j=0;j<length_of_grid;j++)
    {
      grid_array[i][length_of_grid-1-j] = temp_array_sum[j];
    }
  }
  randomDigit();
  create_grid();
}

function uKeyPressed()
{
  var counter =0;
  console.log("Left key pressed");
  for(let i =0;i<length_of_grid;i++)
  {
    let temp=[];
    for(let j=0;j<length_of_grid;j++)
    {
      if(grid_array[j][i]!==0)
      {
        temp.push(grid_array[j][i]);
      }
    }
    counter = temp.length;
    let countzero=0;
    for(let j=0;j<counter-1;j++)
    {
      if(temp[j]===temp[j+1])
      {
        temp[countzero] = temp[j]+ temp[j+1];
        totalScore += temp[countzero];
        if(countzero!==j)temp[j]=0;
        temp[j+1]=0;
        j++;
        countzero++;
      }
      else {
        let temp_store_sum= temp[j];
        temp[j]=0;
        temp[countzero] = temp_store_sum;
        countzero++;
      }
    }
    for(let j=countzero;j<length_of_grid;j++)
    {
      temp.push(0);
    }
    for(let j=0;j<length_of_grid;j++)
    {
      grid_array[j][i] = temp[j];
    }
    grid_array[i].length = length_of_grid;
  }

  randomDigit();
  create_grid();
}
function dKeyPressed()
{
  var counter =0;
  console.log("Left key pressed");
  for(let i =0;i<length_of_grid;i++)
  {
    let temp=[];
    for(let j=length_of_grid-1;j>=0;j--)
    {
      if(grid_array[j][i]!==0)
      {
        temp.push(grid_array[j][i]);
      }
    }
    counter = temp.length;
    let countzero=0;
    for(let j=0;j<counter-1;j++)
    {
      if(temp[j]===temp[j+1])
      {
        temp[countzero] = temp[j]+ temp[j+1];
        totalScore += temp[countzero];
        if(countzero!==j)temp[j]=0;
        temp[j+1]=0;
        j++;
        countzero++;
      }
      else {
        let temp_store_sum= temp[j];
        temp[j]=0;
        temp[countzero] = temp_store_sum;
        countzero++;
      }
    }
    for(let j=countzero;j<length_of_grid;j++)
    {
      temp.push(0);
    }
    for(let j=0;j<length_of_grid;j++)
    {
      grid_array[length_of_grid-1-j][i] = temp[j];
    }
    grid_array[i].length = length_of_grid;
  }

  randomDigit();
  create_grid();
}


function randomDigit()
{
  var counter_for_zero=0;
  var random_digit1 =Math.floor(Math.random()*4);
  var random_digit2 = Math.floor(Math.random()*4);
  for(let i=0;i<length_of_grid;i++)
  {
    for(let j=0;j<length_of_grid;j++)
    {
      if(grid_array[i][j]===0)counter_for_zero++;
    }
  }
  if(counter_for_zero!==0)
  {
    while(grid_array[random_digit1][random_digit2]!==0)
    {
    random_digit1 =Math.floor(Math.random()*4);
    random_digit2 =Math.floor(Math.random()*4);
    }
  grid_array[random_digit1][random_digit2] =(Math.random()>0.5)?2:4;
  }
else {
      checkGameOver();
  }
}

function checkGameOver()
{
  var game_over_check =true;
  for(let i=0;i<length_of_grid;i++)
  {
    for(let j=0;j<length_of_grid;j++)
    {
      if(i+1<length_of_grid)
      {
        if(grid_array_id[i][j]===grid_array_id[i+1][j])
        {
          game_over_check =false;
        }
      }
      if(i-1>=0)
      {
        if(grid_array_id[i][j]===grid_array_id[i-1][j])
        {
          game_over_check =false;
        }
      }
      if(j+1<length_of_grid)
      {
        if(grid_array_id[i][j]===grid_array_id[i][j+1])
        {
          game_over_check =false;
        }
      }
      if(j-1>=0)
      {
        if(grid_array_id[i][j]===grid_array_id[i][j-1])
        {
          game_over_check =false;
        }
      }
    }
  }
  if(game_over_check===true)
  {
    console.log("GameOver");
  }
}

function createColor(value)
{
  var colorValues =[];
  if(value<=16)
  {
    colorValues.push(255);
    let green = 110 - 110*(value-2)/(16-2);
    colorValues.push(green);
    colorValues.push(0);
  }
  else if(value<=4096){
    colorValues.push(255);
    let green = 155*(Math.log2(value)-5)/(12-5) +100;
    colorValues.push(green);
    colorValues.push(0);
  }
  else {
    colorValues.push(255);
    colorValues.push(255);
    colorValues.push(0)
  }
  return colorValues;
}

function left_animation()
  {
    let zero_index = [];
    let non_zero =[];
    for(let i=0;i<length_of_grid;i++)
    {
      zero_index.push(-1);
      non_zero.push(-1);
    }
    for(let i=0;i<length_of_grid;i++)
    {
      let val =0;
      for(let j=0;j<length_of_grid;j++)
      {
        if(grid_array[i][j]!==0)
        {
          val = j;
        }
      }
      non_zero[i]=val;
    }
    for(let i=0;i<length_of_grid;i++)
    {
      for(let j=0;j<length_of_grid;j++)
      {
          if(grid_array[i][j]===0)
          {
              zero_index[i]= j;
              break;
          }
      }
    }
    console.log(zero_index);
    console.log(non_zero);

    for(let i=0;i<length_of_grid;i++)
    {
      console.log("This is not working?");
      let elem_from = document.getElementById(`$${i}${non_zero[i]}`);
      let elem_to = document.getElementById(`$${i}${zero_index[i]}`);
      console.log(elem_to.style.left);
      console.log(elem_from.style.left);
      var pos = elem_from.style.left;
      if(elem_from.style.left>elem_to.style.left)
      {
          var id = setInterval(frame,1000);
          function frame() {
              if (pos>=elem_to.style.left) {
                  clearInterval(id);
                    }
          else {
              pos-=1;
              elem_from.style.left = pos + 'px';
            }
        }
      }
    }
  }
