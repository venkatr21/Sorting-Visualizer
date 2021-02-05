import React, { Component } from 'react'
import './Main.css';
export class Main extends Component {
    constructor(){
        super();
        this.state = {
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
    async bubbleSort(){
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
            },i)
        }
        console.log(changes)
        return arr;
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
                                    backgroundColor: "red",
                                    height: `${element/10}vh`,
                                }}></div>
                            )
                            
                        })
                    }
                </div>
                <div className="row">
                <button onClick={() => this.initArray()}>New Array</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>
            </div>
        )
    }
}
function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Main
