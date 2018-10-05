import React, { PropTypes, Component } from 'react';

import {
    Text,
    View,
} from 'react-native';


/**
 * 使用方法
 * <BBCountDownComponent
    time={2 * 60}  // 倒計時時間 (秒)
    onEnd={() => {
        // 倒計時結束調用的方法
    }}
    fontColor={'#333'}
    fontSize={15}
/>

 */

export default class CountDownComponent extends Component {

    static defaultProps = {
        time: 2 * 60,    // 两分钟
        fontSize: 12,
        fontColor: '#fa6117'
    };


    constructor(props) {
        super(props);
        this.state = {
            leftTime: this.props.time,

        };
    }


    // 開啟定時器 兼容切換到後台
    componentDidMount() {
        // 先记录当前的结束时间
        let endStamp = Date.now() + this.state.leftTime * 1000
        
        this.timer = setInterval(() => {
            let nowStamp = Date.now()
            // 每次倒计时都与当前时间比较
            let leftTime = Math.ceil((endStamp - nowStamp) / 1000) + 1

            if (leftTime > 0) {
                this.state.leftTime = leftTime - 1
                this.setState({ leftTime: this.state.leftTime });
            } else {
                this.setState({ leftTime: 0 })
                this.timer && clearInterval(this.timer)
                this.props.onEnd && this.props.onEnd();
            }
        }, 1000);
    }



    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }




    render() {
        let total = this.state.leftTime

        let hour = (Array(2).join(0) + parseInt(total / 3600)).slice(-2)
        let min = (Array(2).join(0) + parseInt((total - 3600 * hour) / 60)).slice(-2)
        let sec = (Array(2).join(0) + (total - 3600 * hour - 60 * min)).slice(-2)
        return this.state.leftTime > 0 ?
            <View style={{ ...this.props.style }}>
                <Text style={{ fontSize: this.props.fontSize, color: this.props.fontColor }}>{hour > 0 ? hour : ''}{hour > 0 ? ':' : ''}{min}:{sec}</Text>
            </View> : null

    }




}
