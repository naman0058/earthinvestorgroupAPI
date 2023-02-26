let categories = []
let subcategories = []
let amenities = []
let state = []
let developers = []
let projects = []
let agent = []

let table = '/admin/dashboard/store-listing/listing'



$.getJSON(`/api/get-country`, data => {
    subcategories = data
    fillDropDown('countryid',data, 'Choose Country', 0)
})



$.getJSON(`/api/get-amenities`, data => {
    amenities = data
   makeDropdown(data)
})








// state get starts

$.getJSON(`/api/get-state`, data => {
    state = data
    fillDropDown('stateid', [], 'Choose State', 0)
})

$('#countryid').change(() => {
    const filteredData = state.filter(item => item.countryid == $('#countryid').val())
    fillDropDown('stateid', filteredData, 'Choose State', 0)
})


//  state get ends





// developers get starts

$.getJSON(`/api/get-developers`, data => {
    developers = data
    fillDropDown('developersid', [], 'Choose Developers', 0)
})

$('#countryid').change(() => {
    const filteredData = developers.filter(item => item.countryid == $('#countryid').val())
    fillDropDown('developersid', filteredData, 'Choose Developers', 0)
})


//  developers get ends



// projects get starts

$.getJSON(`/api/get-projects`, data => {
    projects = data
    fillDropDown('projectid', [], 'Choose Projects', 0)
})

$('#countryid').change(() => {
    const filteredData = projects.filter(item => item.countryid == $('#countryid').val())
    fillDropDown('projectid', filteredData, 'Choose Projects', 0)
})

//  projects get ends







// agent get starts

$.getJSON(`/api/get-agent`, data => {
    agent = data
    fillDropDown('agentid', [], 'Choose Agent', 0)
})

$('#countryid').change(() => {
    const filteredData = agent.filter(item => item.countryid == $('#countryid').val())
    fillDropDown('agentid', filteredData, 'Choose Agent', 0)
})

//  agent get ends




function fillDropDown(id, data, label, selectedid = 0) {
    $(`#${id}`).empty()
    $(`#${id}`).append($('<option>').val("null").text(label))

    $.each(data, (i, item) => {
        if (item.id == selectedid) {
            $(`#${id}`).append($('<option selected>').val(item.id).text(item.name))
        } else {
            $(`#${id}`).append($('<option>').val(item.id).text(item.name))
        }
    })
}



function makeDropdown(data){
    let table  = `<div class="form-row" style="margin-top: 20px;">
   `
    $.each(data,(i,item)=>{

    table+=`<div class="col-1">
<input type="checkbox" name="checkboxes[]"  id="checkboxes[]" value='${item.name}'>${item.name}
    </div>`
    })
   table+=`</div>`
    
    $('#amenities').html(table)


}






function makeDropdown1(amenities,data){
    console.log('data',data.includes(amenities[0].name))
    console.log('amenties',amenities[0].name)

    let matchresult = amenities.filter(({ id: id1 }) => data.some(({ amenitiesid: id2 }) => id2 === id1))
    let unmatchresult = amenities.filter(({ id: id1 }) => !data.some(({ amenitiesid: id2 }) => id2 === id1))


    console.log('matchresult',matchresult)
    console.log('unmatchresult',unmatchresult)



    let table  = `<div class="form-row" style="margin-top: 20px;">
   `
    $.each(matchresult,(i,item)=>{

    table+=`<div class="col-1">`
table+=`<input type="checkbox" name="updated_checkboxes[]"  id="updated_checkboxes" class='a' checked  value='${item.name}'>${item.name}
</div>`
    })


    $.each(unmatchresult,(i,item)=>{

        table+=`<div class="col-1">`
    table+=`<input type="checkbox" name="updated_checkboxes[]"  id="updated_checkboxes" class='a'  value='${item.name}'>${item.name}
    </div>`
        })


   table+=`</div>`
    
    $('#pamenities').html(table)


}


$('#show').click(function(){

$.getJSON('/api/get-listing',data=>{
    categories = data
    makeTable(data)
})
})




function makeTable(categories){
    let table = ` <div class="table-responsive">

    <button type="button" id="back" class="btn btn-primary" style="margin:20px">BacK</button>
<table id="report-table" class="table  table-striped mb-0">
<thead>
<tr>
<th>Cover Image</th>
<th>Name</th>
<th>Country Name</th>
<th>State Name</th>
<th>Developers Name</th>
<th>Project Name</th>
<th>Agent Name</th>

<th>Options</th>
</tr>
</thead>
<tbody>`

$.each(categories,(i,item)=>{
table+=`<tr>

<td>
<img src="/images/${item.icon}" class="img-fluid img-radius wid-40" alt="" style="width:30px;height:30px">
</td>
<td>${item.name}</td>
<td>${item.countryname}</td>
<td>${item.statename}</td>
<td>${item.developername}</td>
<td>${item.projectname}</td>
<td>${item.agentname}</td>


<td>
<a href="#!" class="btn btn-success btn-sm" id="${item.id}"><i class="feather icon-edit"></i>&nbsp;Preview </a>
<a href="#!" class="btn btn-info btn-sm edits" id="${item.id}"><i class="feather icon-edit"></i>&nbsp;Edit </a>
<a href="#!" class="btn btn-info btn-sm updateimage"  id="${item.id}"><i class="feather icon-edit"></i>&nbsp;Cover Image </a>
<a href="#!" class="btn btn-danger btn-sm deleted" id="${item.id}"><i class="feather icon-trash-2"></i>&nbsp;Delete </a>
</td>
</tr>`
})
table+=`</tbody>
</table>
</div>

  
<!-- End Row -->`
    $('#result').html(table)
    $('#insertdiv').hide()
    $('#result').show()
}




$('#result').on('click', '.deleted', function() {
     const id = $(this).attr('id')
    
     $.get(`${table}/delete`,  { id }, data => {
        refresh()
    })
})




$('#pcountryid').change(() => {
    const filteredData = state.filter(item => item.countryid == $('#pcountryid').val())
    fillDropDown('pstateid', filteredData, 'Choose State', 0)
})


$('#pcountryid').change(() => {
    const filteredData = developers.filter(item => item.countryid == $('#pcountryid').val())
    fillDropDown('pdevelopersid', filteredData, 'Choose Developers', 0)
})


$('#pcountryid').change(() => {
    const filteredData = projects.filter(item => item.countryid == $('#pcountryid').val())
    fillDropDown('pprojectid', filteredData, 'Choose Projects', 0)
})




$('#pcountryid').change(() => {
    const filteredData = agent.filter(item => item.countryid == $('#pcountryid').val())
    fillDropDown('pagentid', filteredData, 'Choose Agent', 0)
})






$('#result').on('click', '.edits', function() {
    const id = $(this).attr('id')
    const result = categories.find(item => item.id == id);
    fillDropDown('pcountryid', subcategories, 'Choose Country', result.countryid)
    $('#pstateid').append($('<option>').val(result.stateid).text(result.statename))
    $('#pdevelopersid').append($('<option>').val(result.developersid).text(result.developername))
    $('#pprojectid').append($('<option>').val(result.projectid).text(result.projectname))
    $('#pagentid').append($('<option>').val(result.agentid).text(result.agentname))





  

    $('#editdiv').show()
    $('#result').hide()
    $('#insertdiv').hide() 
    $('#pid').val(result.id)
     $('#pname').val(result.name)
     $('#pstateid').val(result.stateid)
     $('#pdevelopersid').val(result.developersid)
     $('#pprojectid').val(result.projectid)
     $('#pagentid').val(result.agentid)



     $('#pdescription').val(result.description)
     $('#paddress').val(result.address)



     $.getJSON(`/api/get-listing-amenities?id=${id}`, data => {
        listing_amenities = data
       makeDropdown1(amenities,data)
    })
    
    


   
 })



 $('#result').on('click', '.updateimage', function() {
    const id = $(this).attr('id')
    const result = categories.find(item => item.id == id);
    $('#peid').val(result.id)
})



 
$('#update').click(function(){  //data insert in database

    let productid =$('#updated_checkboxes:checked').val();
    var a = [];
                $("#updated_checkboxes:checked").each(function() {
                    a.push(this.value);
                });
               
    console.log('products',a)
    let b = JSON.stringify(a) 






    let updateobj = {
        id: $('#pid').val(),
        name: $('#pname').val(),
        countryid : $('#pcountryid').val(),
        stateid : $('#pstateid').val(),
        developersid : $('#pdevelopersid').val(),
        projectid : $('#pprojectid').val(),
        agentid : $('#pagentid').val(),
        description : $('#pdescription').val(),
        address : $('#paddress').val(),
        b

       
        }


      

        console.log(updateobj)


    $.post(`/admin/listing/update`, updateobj , function(data) {
       update()
    })
})






function refresh() 
{
    $.getJSON('/api/get-listing',data=>{
        makeTable(data)
    })
}
function update()
{
    $('#result').show()
    $('#editdiv').hide()
    $('#insertdiv').show() 
    refresh()
    refresh()
}

//================================Page Functionality=============================//
$('#editdiv').hide()
$('#updateimagediv').hide()

$('#result').on('click', '#back', function() {
    $('#result').hide()
    $('#insertdiv').show()
})

$('#back1').click(function(){
    $('#result').show()
    $('#insertdiv').hide()
    $('#editdiv').hide()
    $('#updateimagediv').hide()

})

$('#back2').click(function(){
    $('#result').show()
    $('#insertdiv').hide()
    $('#editdiv').hide()
    $('#updateimagediv').hide()
})

$('#result').on('click', '.updateimage', function() {
    $('#updateimagediv').show()
    $('#result').hide()
    $('#insertdiv').hide()
    $('#editdiv').hide()
})


