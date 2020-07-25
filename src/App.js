import React,{Component} from 'react';
import "./App.css";
import CARDS from "./cards/cards.js"



class App extends Component
{
  constructor(props)
  {
    super(props);
   
    this.state={
      score:0,
      over:"",
      highest:0,
      cards:CARDS
    };
    
  }
  unsetFlag=()=>{
    const cards=this.state.cards;
    for(var i=0;i<cards.length;i++)
    {
      cards[i].flag=false;
     
    }
    this.setState({
      cards:cards
    });

  }
checkHighest=(score)=>{
  if(this.state.highest<score)
          {
            this.setState({
              highest:score
            });
          }
}
  handleclick=(cname)=>{
    const cards=this.state.cards;
    for(var i=0;i<cards.length;i++)
    {
      if(cards[i].name===cname)
      {
        if(cards[i].flag)
        {
          this.setState({
            over:"game over"
          });
          break;
        }
        else
        {
          cards[i].flag=true;
          const score=this.state.score+20;
            this.checkHighest(score);
          this.setState({
            score:score
          });
          //this.checkHighest();
          break;
        }
      }
    }
    if(this.state.over==="game over")
    {
      this.unsetFlag();
    }
    else{

        for(i=0;i<cards.length;i++)
        {
          const j=Math.floor(Math.random()*cards.length);
          const temp=cards[i];
          cards[i]=cards[j];
          cards[j]=temp;
        }
        this.setState({
        cards:cards
    });
    }
  }
  restart=()=>{
    this.setState({
      over:"",
      score:0
    });
    this.unsetFlag();
  }

  render()
  {
    const cards=this.state.cards.map(card=>
      <div className="card" onClick={()=>this.handleclick(card.name)}>
        <img  src={card.photo}/>
      </div>);
        return(
      <>
        <center>
        <h1 className="header">card game</h1>
          <h3>score:{this.state.score} <span className="ml-50">highest:{this.state.highest}</span></h3>
          <h1>{this.state.over}</h1>
        {this.state.over?<button onClick={this.restart}>start again</button>:<div>
          {cards}  </div>}
        
        </center>
      </>
      )
  }
}

export default App;