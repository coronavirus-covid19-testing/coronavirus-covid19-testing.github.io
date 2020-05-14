const network = model2();


const marginals = network.exportMarginals();

console.log('before covid probability: ');
marginals['covid'].print();


const nameArray =['age', 'diabetes', 'foreign_travel','smoker', 'cough', 'fever', 'headache', 'fatigue', 'difficulty_breathing', 'sore_throat', 'asthema', 'sputum_production'];
const valArray = [];

for(let i=0;i< nameArray.length;i++)
    valArray.push(Math.round(Math.random));

network.observe(nameArray, 
valArray).then(
    ()=>{

    console.log('after observe yes!')
    network.computeMarginals();

    const marginals = network.exportMarginals();

    console.log('covid probability: ');
    marginals['covid'].print();
    }
)

// console.log(output, coughVal);
