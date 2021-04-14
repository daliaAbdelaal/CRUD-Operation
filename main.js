var productName=document.getElementById("name");
var productCat=document.getElementById("category");
var productPrice=document.getElementById("price");
var productDesc=document.getElementById("description");
var inputs=document.getElementsByClassName("sameInput");
var btn=document.getElementById("btn");
var searchInput=document.getElementById("searchInput");
var productContainer;
var customeIndex;
btn.onclick=function(){
        if( checkName()==true&&checkCat()==true&&checkPrice()==true&&checkDesc()==true )      
         {
                if(btn.innerHTML=="Add Product")
                {
                        addProduct();
                }
                else
                {
                        reAssignProduct();
                }
                productName.classList.remove("is-valid");
                productCat.classList.remove("is-valid");
                productPrice.classList.remove("is-valid");
                productDesc.classList.remove("is-valid");
                // btn.removeAttribute("disabled")
        }else{
                btn.disabled="true";
        }  
        displayProduct();
        clearForm();
}
if(localStorage.getItem("productStore")==null)
{
        productContainer=[];   
}else
{
        productContainer= JSON.parse(localStorage.getItem("productStore")) ;
        displayProduct();
}

function addProduct()
{
        var product=
        {
                name:productName.value,
                category:productCat.value,
                price:productPrice.value,
                description:productDesc.value
        }
        productContainer.push(product)
        localStorage.setItem("productStore", JSON.stringify(productContainer));
}
function displayProduct()
{
              cartonna="";
                for(var i=0;i<productContainer.length;i++)
                {
                       cartonna+=
                       `<tr>
                                <td>${i}</td>
                                <td>${productContainer[i].name}</td>
                                <td>${productContainer[i].category}</td>
                                <td>${productContainer[i].price}</td>
                                <td>${productContainer[i].description}</td>
                                <td><button class="btn btn-outline-info" onclick="updateProduct(${i})">Update</button></td>
                                <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
                       </tr>`
                }
                document.getElementById("tableBody").innerHTML=cartonna;    
}

function updateProduct(index)
{
        customeIndex=index;
        productName.value=productContainer[index].name;
        productCat.value=productContainer[index].category;
        productPrice.value=productContainer[index].price;
        productDesc.value=productContainer[index].description;
        btn.innerHTML="Update product"; 
}

function reAssignProduct()
{
        btn.innerHTML="Add product";
        productContainer[customeIndex].name=productName.value;
        productContainer[customeIndex].category=productCat.value
        productContainer[customeIndex].price=productPrice.value;
        productContainer[customeIndex].description=productDesc.value;
        localStorage.setItem("productStore", JSON.stringify(productContainer));
}
function clearForm()
{
        for(var i=0; i<inputs.length;i++)
        {
                inputs[i].value="";
        }
}

function deleteProduct(index)
{
        productContainer.splice(index,1);
        localStorage.setItem("productStore", JSON.stringify(productContainer));
        displayProduct();
}

searchInput.onkeyup=function(){
        var searchVal=searchInput.value;
        cartonna="";
        // if(validateSearchInput()==true){
                for(var i=0;i<productContainer.length;i++){
                        if(productContainer[i].name.toLowerCase().includes(searchVal.toLowerCase()))
                        {
                        cartonna+=
                        `<tr>
                                        <td>${i}</td>
                                        <td>${productContainer[i].name}</td>
                                        <td>${productContainer[i].category}</td>
                                        <td>${productContainer[i].price}</td>
                                        <td>${productContainer[i].description}</td>
                                        <td><button class="btn btn-info" onclick="updateProduct(${i})">Update</button></td>
                                        <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
                        </tr>`
                        }
                document.getElementById("tableBody").innerHTML=cartonna;    
                }
               
        // }else
        // {
        //         return false
        // }
}

// validateProductName
var nameAlert=document.getElementById("nameAlert");
function checkName() {
        var nameRegex=/^[a-zA-z]{2,20}$/;
        var res = nameRegex.test(productName.value);
        return res;
    }

productName.onkeyup=function()
{
        if( checkName()==true&&productName.value !="")
        {
                productName.classList.add("is-valid");
                productName.classList.remove("is-invalid");
                nameAlert.classList.add("d-none");
                btn.removeAttribute("disabled");
        }else
        {
                
                productName.classList.remove("is-valid")
                productName.classList.add("is-invalid")
                nameAlert.classList.remove("d-none")
                btn.disabled="true";
        }
}
//validateProductCategory
var catAlert=document.getElementById("catAlert");
function checkCat() {
        var namecat=/^[a-zA-z]{2,20}$/;
        var res = namecat.test(productCat.value);
        return res;
    }
productCat.onkeyup=function()
{
        if(checkCat()==true&&productCat.value !="")
        {
                productCat.classList.add("is-valid");
                productCat.classList.remove("is-invalid");
                catAlert.classList.add("d-none")
                btn.removeAttribute("disabled");
               
            
        }else
        {
                productCat.classList.remove("is-valid")
                productCat.classList.add("is-invalid")
                catAlert.classList.remove("d-none") 
                btn.disabled="true"; 
        }
}
// validatePrice
var priceAlert=document.getElementById("priceAlert")
function checkPrice() {
        var priceRegex=/^[1-9][0-9]{0,5}$/;
        var res = priceRegex.test(productPrice.value);
        return res;
    }
productPrice.onkeyup=function(){
       
        if(checkPrice() ==true &&productPrice.value!="")
        {
                productPrice.classList.add("is-valid");
                productPrice.classList.remove("is-invalid");
                priceAlert.classList.add("d-none")
                btn.removeAttribute("disabled");
              
        }else
        {
                productPrice.classList.remove("is-valid")
                productPrice.classList.add("is-invalid")
                priceAlert.classList.remove("d-none")
                btn.disabled="true";   
        }
}
//validateproductDescription
var descAlert=document.getElementById("descAlert")
function checkDesc() {
        var descRegex=/^[a-zA-Z0-9 ,.]{3,100}$/;
        var res = descRegex.test(productDesc.value);
        return res;
    }
productDesc.onkeyup=function(){
       
        if(checkDesc()==true&&productDesc.value!="")
        {
                productDesc.classList.add("is-valid");
                productDesc.classList.remove("is-invalid");
                descAlert.classList.add("d-none") 
                btn.removeAttribute("disabled"); 
               
        }else
        {
                productDesc.classList.remove("is-valid")
                productDesc.classList.add("is-invalid")
                descAlert.classList.remove("d-none")
                btn.disabled="true";
        }
}
//validateSearchInput
// function validateSearchInput(){
//         var descRegex=/^[a-zA-z]{1,20}$/;
//         if(descRegex.test(searchInput.value)==false)
//         {
//                 searchInput.classList.remove("is-valid")
//                 searchInput.classList.add("is-invalid")
//                 searchAlert.classList.remove("d-none") 
//                 return false
//         }else
//         {
               
//                 searchInput.classList.remove("is-invalid")
//                 searchInput.classList.add("is-valid")
//                 searchAlert.classList.add("d-none")
//                 return true
//         }
// }