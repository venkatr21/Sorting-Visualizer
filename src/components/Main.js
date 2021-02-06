import React, {Component } from 'react'
import {mergeSort} from './mergeSort';
import {quickSort} from './quickSort';
const DEFAULT_COLOR = "red";
const SPECIFIC_COLOR = "yellow";
const PIVOT_COLOR = "blue";
export class Main extends Component {

    constructor(){
        super();
        this.state = {
            lock: false,
            size: 30,
            array: [],
            winWidth: window.innerWidth,
        }
    }
    initArray(){
        const array = [];
        for (let i = 0; i < this.state.size; i++) {
        array.push(generateRandomInt(5, 800));
        }
        this.setState({array: array, size: array.length});
    }
    componentDidMount(){
        this.setState({winWidth : window.innerWidth})
        this.initArray()
    }
    insertionSort(){
        this.setState({lock:true});
        let arr = this.state.array.slice();
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
                changedBar.height = `${ele/15}vh`;
                changedBar.backgroundColor = SPECIFIC_COLOR;
                setTimeout(()=>{changedBar.backgroundColor = DEFAULT_COLOR;},i*0.1)
            },i*30)
        }
    }
    bubbleSort(){
        let arr = this.state.array.slice();
        var n = this.state.size;
        let i=0;
        let changes = [];
        for(i=0;i<n;i++){
            for(let j=0;j<n-i;j++){
                if(arr[j+1]<arr[j]){
                    changes.push([j,arr[j],arr[j+1]]);
                    var temp = arr[j+1];
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        const arrTab = document.getElementsByClassName('array-tab');
        for(i=0;i<changes.length;i++){
            const [pos, ele1, ele2] = changes[i]
            const changedBar1 = arrTab[pos].style;
            const changedBar2 = arrTab[pos+1].style;
            setTimeout(()=>{
                changedBar1.height = `${ele2/15}vh`;
                changedBar2.height = `${ele1/15}vh`;
                changedBar1.backgroundColor = SPECIFIC_COLOR;
                changedBar2.backgroundColor = SPECIFIC_COLOR;
                setTimeout(()=>{
                    changedBar1.backgroundColor = DEFAULT_COLOR;
                    changedBar2.backgroundColor = DEFAULT_COLOR;
                },i*0.1)
            },i*30)
        }
    }
    mergeSort() {
        const [changes,arr] = mergeSort(this.state.array);
        for (let i = 0; i < changes.length; i++) {
          const arrTab = document.getElementsByClassName('array-tab');
          const [bar1, bar2, spe, val] = changes[i]
            const changedBar1 = arrTab[bar1].style;
            const changedBar2 = arrTab[bar2].style;
            setTimeout(() => {
                const specificStyle = arrTab[spe].style;
                specificStyle.height = `${val/15}vh`;
                changedBar1.backgroundColor = SPECIFIC_COLOR;
                changedBar2.backgroundColor = SPECIFIC_COLOR;
                setTimeout(()=>{
                    changedBar1.backgroundColor = DEFAULT_COLOR;
                    changedBar2.backgroundColor = DEFAULT_COLOR;
                },i*0.1)
            }, i * 30);
        }
    }
    quickSort() {
        console.log(this.state.array)
        var arr=[],changes=[];
        [arr,changes] = quickSort(this.state.array,0,this.state.array.length,changes);
        const arrTab = document.getElementsByClassName('array-tab');
        console.log(arr)
        for (let i = 0; i < changes.length; i++) {
            const [bar1, bar2, pivot, val1, val2] = changes[i]
            const changedBar1 = arrTab[bar1].style;
            const changedBar2 = arrTab[bar2].style;
            const pivotBar = arrTab[pivot].style;
            setTimeout(() => {
                changedBar1.height = `${val1/15}vh`;
                changedBar2.height = `${val2/15}vh`;
                pivotBar.backgroundColor = PIVOT_COLOR;
                changedBar1.backgroundColor = SPECIFIC_COLOR;
                changedBar2.backgroundColor = SPECIFIC_COLOR;
                setTimeout(()=>{
                    pivotBar.backgroundColor = DEFAULT_COLOR;
                    changedBar1.backgroundColor = DEFAULT_COLOR;
                    changedBar2.backgroundColor = DEFAULT_COLOR;
                },i*0.1)
            }, i * 30);
        }
    }
    handleChange() {
        this.setState({size: parseInt(document.getElementById('changeSize').value)},this.initArray());
    }
    refreshContent(){
        this.setState({lock:false});
    }
    render() {
        return (
            <div className="main container">
                <div className="row justify-content-center align-items-center">
                <input
                    id="changeSize"
                    type="range"
                    min="20"
                    max={this.state.winWidth>430?"100":"70"}
                    value={this.state.size}
                    onChange = {() => this.handleChange()}
                />
                </div><br/><br/>
                <div className="row justify-content-center align-items-center">
                    {
                        this.state.array.map((element,index) =>{
                            return(
                                <div className="array-tab" key={index}
                                style={{
                                    width: `${(50)/this.state.size}%`,
                                    backgroundColor: DEFAULT_COLOR,
                                    height: `${element/15}vh`,
                                    display: "inline-block",
                                    margin: "0 1px",
                                }}></div>
                            )
                            
                        })
                    }
                </div>
                <br />
                <div className="row justify-content-center">
                    <button 
                        className="btn-primary" 
                        onClick={() => {
                            if(!this.state.lock){
                                this.initArray()
                            }
                            }
                    }>New Array</button>
                    <button 
                        className="btn-success" 
                        onClick={() => {
                            if(!this.state.lock){
                                this.setState({lock:true},()=>{
                                    this.bubbleSort()
                                });
                            } 
                            }
                    }>Bubble Sort</button>
                    <button 
                        className="btn-danger" 
                        onClick={() => {
                            if(!this.state.lock){
                                this.setState({lock:true},()=>{
                                    this.insertionSort()
                                });
                            } 
                            }
                    }>Insertion Sort</button>
                    <button 
                        className="btn-primary" 
                        onClick={() => {
                            if(!this.state.lock){
                                this.setState({lock:true},()=>{
                                    this.mergeSort()
                                });
                            } 
                            }
                    }>Merge Sort</button>
                    <button
                        disabled
                        className="btn-success" 
                        onClick={() => {
                            if(!this.state.lock){
                                this.setState({lock:true},()=>{
                                    this.quickSort()
                                });
                            } 
                            }
                    }>Quick Sort</button>
                    <button 
                        disabled
                        className="btn-danger" 
                        onClick={() => {
                            if(!this.state.lock){
                                this.setState({lock:true},()=>{
                                    this.heapSort()
                                });
                            } 
                            }
                    }>Heap Sort</button>
                    <button 
                        className="btn-secondary" 
                        onClick={() => this.refreshContent()}>
                        <span className="fa fa-refresh"></span>
                    </button>
                </div>
            </div>
        )
    }
}
function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Main
