/**
 * @author Roy Rodriguez
 * @author Joshua White
 * @since 2025/11/7
 * @description handles distributions editing
 */

let abortController = new AbortController();

function loadDistributions() {
    const DistributionArray = account.distributions;
    const distributionList = document.querySelector('.distribution-list'); 
    distributionList.innerHTML = ''; // clear current expenses displayed

    // For all expenses in the list, load a expense in the display
    for(let i = 0; i < DistributionArray.length; i++)
    {
        let distribution = document.createElement('li');
        let divider = document.createElement('div');
        //let modifyButton = document.createElement('button');
        //let deleteButton = document.createElement('button');

        //modifyButton.innerHTML = 'Modify Distribution';
        //modifyButton.classList.add('modify-button');
        //modifyButton.classList.add('hidden');

        // Bind modify button to modify expense at index
        //modifyButton.addEventListener('click', function(){
        //    modifyDistribution(i);
        //})

        // Set up delete button
        //deleteButton.innerHTML = 'Delete Distribution';
        //deleteButton.classList.add('delete-button');
        //deleteButton.classList.add('hidden');

        // Bind delete button to delete expense at index
        //deleteButton.addEventListener('click', function(){
        //    deleteWarning(i);
        //})
        
        distribution.classList.add('categories');
        divider.classList.add('bar');

        // Add notication text and date to display
        // dude what even is this formatting
        distribution.innerHTML = `
        <p class="transaction-text"> ${DistributionArray[i][0]}
        <p class="amount-text"> ${DistributionArray[i][1]}
        `;

        // Add expense to the list.
        distribution.innerHTML = 
            `<input type="checkbox" class="hidden checkbox" id="checkbox-${i}">`
            + distribution.innerHTML;
        distributionList.appendChild(distribution);
        //expenseList.appendChild(modifyButton);
        //expenseList.appendChild(deleteButton);
        distributionList.appendChild(divider);
    }
}

/**
 * Open window for adding Distribution
 */
function openAddDistribution()
{
    // Abort any operation pre-existing involving the expense and reset the controller
    // to prepare for any operation using the expense panel
    abortController.abort()
    abortController = new AbortController();

    // Obtian all buttons
    const createBox = document.querySelector(".create-box");
    const errorText = document.querySelector('.error-text');

    //Commented these out cause they weren't being used.
    //const distributionTextInput = document.querySelector('#distribution-text');
    //const distributionDateInput = document.querySelector('#expense-date');

    const addDistributionButton = document.querySelector('#add-distribution');
    const modifyDistributionButton = document.querySelector('#modify-distribution');

    // Reveal add button
    addDistributionButton.classList.remove('hidden');
    modifyDistributionButton.classList.add('hidden');

    // clear input fields on open
    // distributionTextInput.value = "";
    // distributionDateInput.value = "";

    // Hide error text, and reveal createbox when it's ready
    errorText.classList.add('hidden'); 
    createBox.classList.remove('hidden');
}

function modifyDistribution()
{
    const modifyButtons = document.querySelectorAll(".modify-button");


    for(let i = 0; i < modifyButtons.length; i++)
    {
        modifyButtons[i].classList.toggle('hidden');
    }
}

/**
 * Close window for adding distribution
 */
function closeAddDistribution() {
    const createBox = document.querySelector(".create-box");

    createBox.classList.add('hidden');
}


/**
 * 
 * @param {int} newDistPercent - percentage of new distribution to be added 
 * @returns Total percentage of all distributions including new one
 */
function checkDistributionTotal(newDistPercent) {

    //Initialize
    let distributions = account.distributions;
    let totalPercent = 0;

    //Distributions are ordered as a 2d array [name, percent] so must pull just the percent
    for (let i = 0; i < distributions.length; i++) {
        totalPercent += parseInt(distributions[i][1]);
    }

    return totalPercent + parseInt(newDistPercent);
}

function addDistribution(index) {
    
}

async function main() {

    //Get account
    await account.loadFromStorage();

    //Elements
    const addButton = document.querySelector('#add-button'); //Add Distribution button
    const modifyButton = document.querySelector('#modify-button');  //Modify Distribution button
    const deleteButton = document.querySelector('#delete-button');  //Delete Distribution button
    const cancelDistributionButton = document.querySelector('#cancel-distribution');

    //Listeners
    addButton.addEventListener('click', openAddDistribution);
    modifyButton.addEventListener('click', modifyDistribution);
    deleteButton.addEventListener('click', function() {print("not done :3")});
    cancelDistributionButton.addEventListener('click', closeAddDistribution);

    //Load distributions on page open
    loadDistributions();
}

//Call main
main();