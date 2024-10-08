// Global Variablres

const WinWidth = window.outerWidth;
const WinHeight = window.outerHeight;
const BoxSize = 30;
const Time_step = 100;//time for each frame in (ms)

const grid_width = (WinWidth / BoxSize)-1;
const grid_height = (WinHeight / BoxSize)/1.3;

const grid_div = document.querySelector('.grid');
let [Rand_start_x,Rand_start_y,Rand_end_x,Rand_end_y] = start_end_cell(); 

function start_end_cell(){
    let Rand_start_x = Math.floor(Math.random()*(grid_width));
    let Rand_start_y = Math.floor(Math.random()*(grid_height));
    let Rand_end_x = Math.floor(Math.random()*(grid_width));
    let Rand_end_y = Math.floor(Math.random()*(grid_height));


    return [Rand_start_x,Rand_start_y,Rand_end_x,Rand_end_y]

}

function create_grid() {
    const fragment = document.createDocumentFragment();

    

    for (let y = 0; y < grid_height; y++) {
        for (let x = 0; x < grid_width; x++) {
            let child = document.createElement('div');
            if(x == Rand_end_x && y == Rand_end_y){
                child.classList.add('end_cell');
                child.style.backgroundImage = "url('./icons/end.png')";
                child.style.backgroundRepeat = 'no-repeat';
                child.style.backgroundSize = '100% 100%';
            }else if(x == 0 || x == grid_width - 1 || y == 0 || y >= grid_height - 1){
                child.classList.add('wall_cell');
            }
            else if(x == Rand_start_x && y == Rand_start_y){
                child.classList.add('start_cell');
                child.classList.remove('route_cell');
                child.style.backgroundImage = "url('./icons/start.png')";
                child.style.backgroundRepeat = 'no-repeat';
                child.style.backgroundSize = '100% 100%';
            }
            else{
                child.classList.add('empty_cell');
            }
            child.id = `x = ${x},y = ${y}`;
            child.style.width = `${BoxSize}px`;
            child.style.height = `${BoxSize}px`;
            child.style.position = 'absolute';
            child.style.border = '1px solid black';
            child.style.left = `${x * BoxSize}px`;  // Horizontal position
            child.style.top = `${y * BoxSize}px`;   // Vertical position
            
            fragment.appendChild(child);
        }
    }

    grid_div.appendChild(fragment);
    
}

function handle_walls(){

    // for adding walls (we need to check first if the mouse event has already been triggerd)
    // mouse
    let mouse_active = false;
    if(mouse_active === false){
        document.addEventListener('mousedown',(event)=>{
            mouse_active = true;
            if (event.target.classList.contains('empty_cell')){
                event.target.classList.add('wall_cell');
                event.target.classList.remove('empty_cell');
            }
        })
        document.addEventListener('mouseup',()=>{
            mouse_active = false;
        })
    }
    document.addEventListener('mouseover',(event)=>{
        if(mouse_active && event.target.classList.contains('empty_cell')) {
            event.target.classList.add('wall_cell');
            event.target.classList.remove('empty_cell');
        }
    })


}

function start_algorithm(){
    function calculate_distance(x, y) {
        return Math.sqrt((x-Rand_end_x)**2 + (y-Rand_end_y)**2);
    }
    function travel_to_right_move(distances,right_move,collision){
        if(collision < 8){
            if (distances.right === right_move[collision]) {
                let temp = document.getElementById(`x = ${head_grid_x + 1},y = ${head_grid_y}`);
                if (temp.classList.contains('wall_cell') || temp.classList.contains('route_cell')) {
                    collision++;
                    travel_to_right_move(distances,right_move,collision);
                }else{
                    head_grid_x++; // Right
                }
            } else if (distances.bottomRight === right_move[collision]) {
                let temp = document.getElementById(`x = ${head_grid_x + 1},y = ${head_grid_y - 1}`);
                if (temp.classList.contains('wall_cell')) {
                    collision++;
                    travel_to_right_move(distances,right_move,collision);
                }else{
                    head_grid_x++;
                    head_grid_y--; // Bottom-Right
                    
                }
            } else if (distances.bottom === right_move[collision]) {
                let temp = document.getElementById(`x = ${head_grid_x},y = ${head_grid_y - 1}`);
                if (temp.classList.contains('wall_cell') || temp.classList.contains('route_cell')) {
                    collision++;
                    travel_to_right_move(distances,right_move,collision);
                }else{
                    head_grid_y--; // Bottom
                    
                }
            } else if (distances.bottomLeft === right_move[collision]) {
                let temp = document.getElementById(`x = ${head_grid_x - 1},y = ${head_grid_y - 1}`)
                if (temp.classList.contains('wall_cell') || temp.classList.contains('route_cell')) {
                    collision++;
                    travel_to_right_move(distances,right_move,collision);
                }else{
                    head_grid_x--;
                    head_grid_y--; // Bottom-Left
                    
                }
            } else if (distances.left === right_move[collision]) {
                let temp = document.getElementById(`x = ${head_grid_x - 1},y = ${head_grid_y}`);
                if (temp.classList.contains('wall_cell') || temp.classList.contains('route_cell')) {
                    collision++;
                    travel_to_right_move(distances,right_move,collision);
                }else{
                    head_grid_x--; // Left
                    
                }
            } else if (distances.topLeft === right_move[collision]) {
                let temp = document.getElementById(`x = ${head_grid_x - 1},y = ${head_grid_y + 1}`);
                if (temp.classList.contains('wall_cell') || temp.classList.contains('route_cell')) {
                    collision++;
                    travel_to_right_move(distances,right_move,collision);
                }else{
                    head_grid_x--;
                    head_grid_y++; // Top-Left
                    
                }
            } else if (distances.top === right_move[collision]) {
                let temp = document.getElementById(`x = ${head_grid_x},y = ${head_grid_y + 1}`);
                if (temp.classList.contains('wall_cell') || temp.classList.contains('route_cell')) {
                    collision++;
                    travel_to_right_move(distances,right_move,collision);
                }else{
                    head_grid_y++; // Top
                    
                }
            }else if (distances.topRight === right_move[collision]) {
                let temp = document.getElementById(`x = ${head_grid_x + 1},y = ${head_grid_y + 1}`);
                if (temp.classList.contains('wall_cell') || temp.classList.contains('route_cell')) {
                    collision++;
                    travel_to_right_move(distances,right_move,collision);
                }else{
                    head_grid_y++; // Top-Right
                    head_grid_x++;
                    
                }
                
            }
            if (collision === 8) {
                head_grid_x--;
                head_grid_y--;
            }
        }
    }
    
    function handle_routes() {
        // Movement logic
        let collision = 0; // initilised for smallest distance
        let distances = {
            right: calculate_distance(head_grid_x + 1, head_grid_y),
            bottomRight: calculate_distance(head_grid_x + 1, head_grid_y - 1),
            bottom: calculate_distance(head_grid_x, head_grid_y - 1),
            bottomLeft: calculate_distance(head_grid_x - 1, head_grid_y - 1),
            left: calculate_distance(head_grid_x - 1, head_grid_y),
            topLeft: calculate_distance(head_grid_x - 1, head_grid_y + 1),
            top: calculate_distance(head_grid_x, head_grid_y + 1),
            topRight: calculate_distance(head_grid_x + 1, head_grid_y + 1)
        };
        
        // Convert distances to an array and sort
        let right_move = Object.values(distances).sort((a, b) => a - b);
        let prev_x = head_grid_x;
        let prev_y = head_grid_y;
        travel_to_right_move(distances,right_move,collision);
        
        distance = calculate_distance(head_grid_x, head_grid_y);

        
        next_cell = document.getElementById(`x = ${head_grid_x},y = ${head_grid_y}`);
        prev_cell = document.getElementById(`x = ${prev_x},y = ${prev_y}`);
        // Update blocks traveled
        distance_traveled++;

        if (!next_cell.classList.contains('wall_cell')) {
            const audio = new Audio('sounds/pop.mp3');
            audio.play();
            prev_cell.classList.add('route_cell');
            prev_cell.classList.remove('next_cell');
            next_cell.classList.add('next_cell');
            next_cell.classList.remove('empty_cell');
        }
        
        if (distance > 1) {
            setTimeout(handle_routes, Time_step);
        }
        else{
            document.querySelector('.shortest_dist .value').textContent = `${distance_traveled} blocks`;
        }
    }

    let head_grid_x = Rand_start_x;
    let head_grid_y = Rand_start_y;
    let distance_traveled = 0;
    let distance = calculate_distance(head_grid_x, head_grid_y);

    handle_routes();
}


function handle_inputs(){
    document.getElementById('BtnStart').onclick = function() {
        console.log('Btn start here!');
        start_algorithm();
      };
    document.getElementById('Reset').onclick = function() {
        location.reload();
    }
}

function main_loop(){
    create_grid();
    handle_walls();
    handle_inputs();
}

main_loop()