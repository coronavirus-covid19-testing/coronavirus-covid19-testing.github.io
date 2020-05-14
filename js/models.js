
function generateProbabilities(w){

    tf.tensor([[[[ 1-(1.8181819*w) , w*1.8181819],
       [ 1-(1.0*w)       , w*1.0      ]],
      [[ 1-(2.2727273*w) , w*2.2727273],
       [ 1-(1.8181819*w) , w*1.8181819]]],
     [[[ 1-(1.3636364*w) , w*1.3636364],
       [ 1-(1.090909*w)  , w*1.090909 ]],
      [[ 1-(2.7272727*w) , w*2.7272727],
       [ 1-(2.2727273*w) , w*2.2727273]]]]).print();
}


  

function model1(){

    console.log("using model-1");

    const nodeNames = ['covid', 'cough', 'headache', 'fatigue', 'fever', 'smoker', 'difficulty_breathing', 'sore_throat', 'asthema', 'sputum_production' ]
    const dims =      [2,         2,          2,         2,        2,       2,                2,                  2,         2,             2,];

    const nodes = (
    function(){

    const variableArray = [];
    for(let i=0;i< nodeNames.length;i++){
        variableArray.push(new Variable(nodeNames[i], dims[i]))
    }

    return variableArray;

    }()
    );


    const cpdCovid       = new Factor(name='Mcovid',    tf.tensor([[0.89],[0.11]]));

    const cpdCough       = new Factor(name='covid-cough',                tf.tensor([[0.70, 0.30], [0.31 ,  0.69 ]]));
    const cpdHeadache    = new Factor(name='covid-headache',             tf.tensor([[0.80, 0.20], [0.87 ,  0.13 ]]));
    const cpdFatigue     = new Factor(name='covid-fatigue',              tf.tensor([[0.80, 0.20], [0.60 ,  0.40 ]]));
    const cpdFever       = new Factor(name='covid-fever',                tf.tensor([[0.70, 0.30], [0.11 ,  0.89 ]]));
    const cpdSmoker      = new Factor(name='covid-smoker',               tf.tensor([[0.72, 0.28], [0.78 ,  0.22 ]]));
    const cpdBreathing   = new Factor(name='covid-difficulty_breathing', tf.tensor([[0.94, 0.06], [0.813,  0.187]]));
    const cpdSoreThroat  = new Factor(name='covid-sore_throat',          tf.tensor([[0.92, 0.08], [0.86 ,  0.14 ]]));
    const cpdAsthema     = new Factor(name='covid-asthema',              tf.tensor([[0.98, 0.02], [0.60 ,  0.40 ]]));
    const cpdSputum      = new Factor(name='covid-sputum_production',    tf.tensor([[0.95, 0.05], [0.67 ,  0.33 ]]));

    // console.log(nodes[0])
    const network = new FactorGraph(nodes[0], false,false);

    network.append('covid', cpdCovid);

    network.append('covid', cpdCough);
    network.append('covid-cough', nodes[1]);

    network.append('covid', cpdHeadache);
    network.append('covid-headache', nodes[2]);

    network.append('covid', cpdFatigue);
    network.append('covid-fatigue', nodes[3]);

    network.append('covid', cpdFever);
    network.append('covid-fever', nodes[4]);

    network.append('covid', cpdSmoker);
    network.append('covid-smoker', nodes[5]);

    network.append('covid', cpdBreathing);
    network.append('covid-difficulty_breathing', nodes[6]);

    network.append('covid', cpdSoreThroat);
    network.append('covid-sore_throat', nodes[7]);

    network.append('covid', cpdAsthema);
    network.append('covid-asthema', nodes[8]);

    network.append('covid', cpdSputum);
    network.append('covid-sputum_production', nodes[9]);


    network.computeMarginals()

    return network;

}




function model2(){

    console.log("using model-2");


    const nodeNames = ['age',
            'foreign_travel','smoking', 'asthema','diabetes',
            'immune_system',
            'covid', 
            'cough', 'headache', 'fatigue', 'fever', 'smoker', 'difficulty_breathing', 'sore_throat', 'asthema', 'sputum_production' ]
    const dims =      [ 3, 
            2, 2, 2, 2,
            2,
            2,
            2,          2,         2,        2,       2,                2,                  2,         2,             2,];

    const nodes = (
    function(){

    const variableArray = [];
    for(let i=0;i< nodeNames.length;i++){
    variableArray.push(new Variable(nodeNames[i], dims[i]))
    }

    return variableArray;

    }()
    );


    const cpdAge         = new Factor(name="age", tf.tensor([0.45180, 0.5, 0.0482]));

    const cpdForeignTravel  = new Factor(name="age-foreign_travel", tf.tensor([[0.6, 0.4], [0.7, 0.3], [0.9, 0.1]]));
    const cpdDiabetes    = new Factor(name="age-diabetes", tf.tensor([[1.0, 0.0], [0.65, 0.35], [0.7, 0.3]]));

    const cpdSmoking     = new Factor(name="age-smoking", tf.tensor([[0.86, 0.14], [0.72, 0.28], [0.72, 0.28]]));
    const cpdAsthema     = new Factor(name="age-asthema", tf.tensor([[0.96, 0.04], [0.98, 0.02], [0.98, 0.02]]));
    const cpdImmuneSystem = new Factor(name="age_&_diabetes-immune_system", tf.tensor([[[0.2, 0.8],[0.7, 0.3]],
                                                                            [[0.4, 0.6],[0.8, 0.2]],
                                                                            [[0.7, 0.3],[0.9, 0.1]]]));


    // TODO: generate probabilities and finish this cpd... f, s, a, i
    const cpdCovid = new Factor(name="covid_factor", tf.tensor([[[[[0.8, 0.2],   [0.89, 0.11]],
                                                    [[0.75, 0.25], [0.8, 0.2]]],
                                                [[[0.85, 0.15], [0.88, 0.12]],
                                                    [[0.7, 0.3], [0.75, 0.25]]]],

                                                [[[ [  1-0.26  , 0.26 ],
                                                [ 1-0.143 , 0.143]],
                                                [[ 1-0.325 , 0.325],
                                                [ 1-0.26  , 0.26 ]]],
                                                [[[ 1-0.195 , 0.195],
                                                [ 1-0.156 , 0.156]],
                                                [[ 1-0.39  , 0.39 ],
                                                [ 1-0.325 , 0.325]]]]
                                                ]
                                                )
    );

    const cpdCough       = new Factor(name='covid-cough',                tf.tensor([[0.70, 0.30], [0.31 ,  0.69 ]]));
    const cpdHeadache    = new Factor(name='covid-headache',             tf.tensor([[0.80, 0.20], [0.87 ,  0.13 ]]));
    const cpdFatigue     = new Factor(name='covid-fatigue',              tf.tensor([[0.80, 0.20], [0.60 ,  0.40 ]]));
    const cpdFever       = new Factor(name='covid-fever',                tf.tensor([[0.70, 0.30], [0.11 ,  0.89 ]]));
    const cpdBreathing   = new Factor(name='covid-difficulty_breathing', tf.tensor([[0.94, 0.06], [0.813,  0.187]]));
    const cpdSoreThroat  = new Factor(name='covid-sore_throat',          tf.tensor([[0.92, 0.08], [0.86 ,  0.14 ]]));
    const cpdSputum      = new Factor(name='covid-sputum_production',    tf.tensor([[0.95, 0.05], [0.67 ,  0.33 ]]));

    const network = new FactorGraph(nodes[0], true,true);
    network.append('age', cpdAge);


    network.append('age', cpdForeignTravel);
    network.append('age-foreign_travel', nodes[1]);

    network.append('age', cpdSmoking);
    network.append('age-smoking', nodes[2]);

    network.append('age', cpdAsthema);
    network.append('age-asthema', nodes[3]);

    network.append('age', cpdDiabetes);
    network.append('age-diabetes', nodes[4]);




    network.append('age', cpdImmuneSystem);
    network.append('diabetes', cpdImmuneSystem);
    network.append('age_&_diabetes-immune_system', nodes[5]);

    network.append('foreign_travel', cpdCovid);
    network.append('smoking', cpdCovid);
    network.append('asthema', cpdCovid);
    network.append('immune_system', cpdCovid);


    network.append('covid_factor', nodes[6]);


    // network.append('foreign_travel', nodes[6]);
    // network.append('smoking', nodes[6]);
    // network.append('asthema', nodes[6]);
    // network.append('immune_system', nodes[6]);
    // network.append('covid', cpdCovid);




    network.append('covid', cpdCough);
    network.append('covid-cough', nodes[7]);

    network.append('covid', cpdHeadache);
    network.append('covid-headache', nodes[8]);

    network.append('covid', cpdFatigue);
    network.append('covid-fatigue', nodes[9]);

    network.append('covid', cpdFever);
    network.append('covid-fever', nodes[10]);


    network.append('covid', cpdBreathing);
    network.append('covid-difficulty_breathing', nodes[12]);

    network.append('covid', cpdSoreThroat);
    network.append('covid-sore_throat', nodes[13]);

    network.append('covid', cpdSputum);
    network.append('covid-sputum_production', nodes[15]);


    network.computeMarginals()

    return network;

}