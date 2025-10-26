/**
 * Test checkDistributionTotal using terminal instead of browser
 * 
 */

function checkDistributionTotal(newDistPercent) {
    let dists = distributions;
    let totalPercent = 0;

    //Distributions are ordered as a 2d array [name, percent] so must pull just the percent
    for (let i = 0; i < distributions.length; i++) {
        totalPercent += parseInt(distributions[i][1]);
    }

    //Return total percent
    return totalPercent + parseInt(newDistPercent);
}
