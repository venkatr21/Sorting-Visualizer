import React, { Component } from 'react'
import './Main.css';
const DEFAULT_COLOR = "red";
export class Main extends Component {
    constructor(){
        super();
        this.state = {
            lock: false,
            size: 200,
            array: [],
        }
    }
    initArray(){
        const array = [];
        for (let i = 0; i < this.state.size; i++) {
        array.push(generateRandomInt(5, 730));
        }
        this.setState({array});
        console.log(100/this.state.size)
    }
    componentDidMount(){
        this.initArray()
    }
    insertionSort(){
        this.setState({lock: !this.state.lock})
        let arr = this.state.array;
        var n = this.state.size;
        let changes = [];
        for (let i = 1; i < n; i++) {
            let current = arr[i];
            let j = i-1; 
            while ((j > -1) && (current < arr[j])) {
                changes.push([j+1,arr[j]])
                arr[j+1] = arr[j];
                j--;
            }
            arr[j+1] = current;
            changes.push([j+1,current])
        }
        const arrTab = document.getElementsByClassName('array-tab');
        for(let i=0;i<changes.length-1;i++){
            const [pos, ele] = changes[i]
            const changedBar = arrTab[pos].style;
            setTimeout(()=>{
                changedBar.height = `${ele/10}vh`;
            },i*2)
        }
        this.setState({array: arr})
        this.setState({lock: false})
    }
    bubbleSort(){
        this.setState({lock: !this.state.lock})
        let arr = this.state.array;
        var n = this.state.size;
        let changes = [];
        for(var i=0;i<n;i++){
            for(var j=0;j<n-1;j++){
                if(arr[j+1]<arr[j]){
                    changes.push([j,arr[j],arr[j+1]]);
                    var temp = arr[j+1];
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        const arrTab = document.getElementsByClassName('array-tab');
        for(i=0;i<changes.length-1;i++){
            const [pos, ele1, ele2] = changes[i]
            const changedBar1 = arrTab[pos].style;
            const changedBar2 = arrTab[pos+1].style;
            setTimeout(()=>{
                changedBar1.height = `${ele2/10}vh`;
                changedBar2.height = `${ele1/10}vh`;
            },i*2)
        }
        this.setState({array: arr})
        this.setState({lock: false})
    }
    render() {
        return (
            <div className="main container">
                <div className="row justify-content-center align-items-center">
                    {
                        this.state.array.map((element,index) =>{
                            return(
                                <div className="array-tab" key={index}
                                style={{
                                    width: `3px`,
                                    backgroundColor: DEFAULT_COLOR,
                                    height: `${element/10}vh`,
                                }}></div>
                            )
                            
                        })
                    }
                </div>
                <br />
                <div className="row justify-content-center">
                <button onClick={() => {if(!this.state.lock) this.initArray()}}>New Array</button>
                <button onClick={() => {if(!this.state.lock) this.bubbleSort()}}>Bubble Sort</button>
                <button onClick={() => {if(!this.state.lock) this.insertionSort()}}>Insertion Sort</button>
                <button onClick={() => {if(!this.state.lock) this.initArray()}}>Merge Sort</button>
                <button onClick={() => {if(!this.state.lock) this.initArray()}}>Quick Sort</button>
                <button onClick={() => {if(!this.state.lock) this.initArray()}}>Heap Sort</button>
                </div>
            </div>
        )
    }
}
function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Main
