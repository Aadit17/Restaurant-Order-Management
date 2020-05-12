//JavaScript-C24.2.0 (SpiderMonkey)

module.exports = function(){
    this.knapsack = function(items, W) {
    var item = 0,
        weight = 0,
        max_before = 0,
        max_after = 0,
        number_of_items = items.length,
        matrix_weight = new Array(number_of_items + 1),
        matrix_to_keep = new Array(number_of_items + 1),
        solution_array = [],
        remaining_array = [];

    for (item = 0; item < number_of_items + 1; item++) {
        matrix_weight[item] = new Array(W + 1);
        matrix_to_keep[item] = new Array(W + 1);
    }

    for (item = 0; item <= number_of_items; item++) {
        for (weight = 0; weight <= W; weight++) {

            if (item === 0 || weight === 0) {
                matrix_weight[item][weight] = 0;
            }

            else if (items[item - 1].w <= weight) {
                max_after = items[item - 1].b + matrix_weight[item - 1][weight - items[item - 1].w];
                max_before = matrix_weight[item - 1][weight];

                if (max_after > max_before) {
                    matrix_weight[item][weight] = max_after;
                    matrix_to_keep[item][weight] = 1;
                }
                else {
                    matrix_weight[item][weight] = max_before;
                    matrix_to_keep[item][weight] = 0;
                }
            }

            else {
                matrix_weight[item][weight] = matrix_weight[item - 1][weight];
            }
        }
    }

    weight = W;
    item = number_of_items;
    for (item; item > 0; item--) {
        if (matrix_to_keep[item][weight] === 1) {
            solution_array.push(items[item - 1]);
            weight = weight - items[item - 1].w;
        }
            else{
                remaining_array.push(items[item - 1]);
            }
    }

    print("Max Benefit: ", matrix_weight[number_of_items][W]);
    
    solution_array.forEach(function(item){
        print("Max Benefited from: ", item.w, item.b);
    });
    
    print ("Remaining Items: ");
    
    remaining_array.forEach(function(item){
        print("Remaining items: ", item.w, item.b);
    });
    
    len = remaining_array.length;
    
    if(len !== 0){
        knapsack(remaining_array,6);
    }
}

}
// Call Function with 4 items and W=6

  

