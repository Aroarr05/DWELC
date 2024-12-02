document.addEventListener("DOMContentLoaded",()=>{
    function sortProciences(provinces,criterion, order) {
        return provinces.sort((a,b) =>{
            let valueA, valueB;
            if(criterion==='alphabetical'){
                valueA = a.label;
                valueB = b.label;
            }else if (criterion === 'townsCount'){
                valueA = a.towns.length;
                valueB = b.towns.length;
            }
            if(order === 'asc'){
                return valueA > valueB?1:(valueA<valueB?-1:0);
            }else{
                return valueA < valueB ?1:(valueA>valueB?-1:0);
            }
        });
    }

    function renderPage(){
        const sortCriteria = document.getElementById('sortCriteria').value;
        const sortOrder = document.getElementById('sortOrder').value;
        const accordionContainer = document.getElementById('accordion');
        accordionContainer.innerHTML = "";
        
        data.forEach(community =>{
            const sortedProcinces = sortProvinces(community.provinces,sortCriteria,sortOrder);
            acco
        })

    }








});