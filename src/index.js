import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.css'


// Componentクラスを継承したJankenGamePageというclass
class JankenGamePage extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    // => {}
    // コンポーネント自体が状態や値を持ちたい場合、それを保存するのがState
    this.state = {human: null, computer: null}
  }
  pon(human_hand) {
    const computer_hand = Math.floor(Math.random() * 3)
    // stateの更新をする際はsetをつける(reactのライブラリーのおかげで実行できるから)
    this.setState({human: human_hand, computer: computer_hand})
  }

  judge() {
    if (this.state.human == null) {
      return null
    } else {
      return (this.state.computer - this.state.human + 3) % 3
    }
  }

  // Componentを継承したクラスにrender()メソッドを定義するとJSXを表示することができる
  // renderメソッドの定義がされているがどこからも呼び出されていない
  render() {
    return (
      <div>
        <h1>じゃけん PON!</h1>
        <JankenBox actionPon={(te) => this.pon(te)} />
        <ScoreBox human={this.state.human} computer={this.state.computer}
        judgement={this.judge()} />        
      </div>
    )
  }

  // リロード(アプリが読み込まれた時)に実行
  // componentDidMount() {
  //   setTimeout(() => {this.pon(1)}, 1000)
  // }

  // render()メソッドを呼び出す出さないの判断ができる
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(`nextState: ${nextState}`)
  //   console.log(nextState)
  //   console.log(`this.state: ${this.state}`)
  //   console.log(this.state)

  //   const identical = nextState.human == this.state.human && 
  //                       nextState.computer == this.state.computer
      //  前回と同様の手ならrenderメソッドが実行されずにconsole.log..が実行。メモリの節約が可能
  //   if (identical) { console.log("Identical") }
  //   return !identical
  // }
}

const JankenBox = props => {
  return (
    <div>
      {/* () => を省略すると実行された結果がonClick属性の値になる */}
      <button onClick={() => props.actionPon(0)} >グー</button>
      <button onClick={() => props.actionPon(1)} >チョキ</button>
      <button onClick={() => props.actionPon(2)} >パー</button>
    </div>
  
  )
}

JankenBox.propTypes = {
  actionPon: PropTypes.func
}

const ScoreBox = props => {
  // console.log(props) propsは送られたパラメーターの意味(?)で変更してはいけない
  // props["human"] = "hoge"
  // =>Cannot assign to read only property 'human' of object
  console.log(props)

  const teString = ["グー", "チョキ", "パー"]
  const judgementString = ["引き分け", "勝ち", "負け"]
  return (
    <table>
      <tbody>
        <tr>
          <th>あなた</th>
          <td>{teString[props.human]}</td>
        </tr>
        <tr>
          <th>Computer</th>
          <td>{teString[props.computer]}</td>
        </tr>
        <tr>
          <th>勝敗</th>
          <td>{judgementString[props.judgement]}</td>
        </tr>
      </tbody>
    </table>
  )
}

ScoreBox.propTypes = {
  human: PropTypes.number,
  computer: PropTypes.number,
  judgement: PropTypes.number
}

ReactDOM.render(
  <JankenGamePage />,
  document.getElementById('root')
)