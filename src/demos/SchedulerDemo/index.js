import React, {Component, Suspense, Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const createID = () => (+new Date());

class ClassComp extends Component {
    state = {
        array: [{id: 'user1', name: '王大'}, {id: 'user2', name: '赵二'}, {id: 'user3', name: '张三'}, {
            id: 'user4',
            name: '李四'
        }]
    }

    handleClick = (e) => {
        let {array} = this.state;
        let id = createID();
        const type = typeof e === 'string' ? e : e.target.dataset.type;

        switch (type) {
            case 'change-order':
                let delItem = array.splice(1, 1);
                array.splice(2, 0, delItem[0]);
                break;
            case 'head-add':
                array.unshift({id: 'user-head-add' + id, name: '头部添加用户' + id})
                break;
            case 'tail-add':
                array.push({id: 'user-tail-add' + id, name: '尾部添加用户' + id})
                break;
            case 'mid-add':
                array.splice(1, 0, {id: 'user-mid-add' + id, name: '中间添加用户' + id});
                break;
            case 'head-del':
                array.shift();
                break;
            case 'tail-del':
                array.pop();
                break;
            case 'mid-del':
                array.splice(1, 1);
                break;
            default:
                break;
        }

        this.setState({
            array
        });
    }

    render() {
        const {array} = this.state;
        const btnList = [{
            type: 'change-order',
            name: '数组总数不变，只是交换顺序'
        }, {
            type: 'head-add',
            name: '数组总数变了，头部添加一个'
        }, {
            type: 'tail-add',
            name: '数组总数变了，尾部添加一个'
        }, {
            type: 'mid-add',
            name: '数组总数变了，中间添加一个'
        }, {
            type: 'head-del',
            name: '数组总数变了，头部删除一个'
        }, {
            type: 'tail-del',
            name: '数组总数变了，尾部删除一个'
        }, {
            type: 'mid-del',
            name: '数组总数变了，中间删除一个'
        }]

        return (
            <div key='wrapper'>
                {
                    btnList.map(({type, name}, i) => (
                        <button
                            key={type}
                            data-type={type}
                            onClick={this.handleClick}
                            //  onClick={this.handleClick.bind(this, type)}
                        >
                            {name}
                        </button>
                    ))
                }

                {
                    array.map(({id, name}, i) => (
                        <div key={id}>年龄：{name}</div>
                    ))
                }
            </div>
        );
    }
}

class SchedulerTask extends React.Component {
    constructor(props) {
        super(props)
        this.buttonRef = React.createRef();
    }
    state = {
        count: 0,
        positionX: 0,
        positionY: 0,
        moving: false,
        parentX: 0,
        parentY: 0,
    }
    componentDidMount() {
        const target = document.getElementById('drag-element')
        target.addEventListener('mousedown', e => {
            const x = e.clientX - target.offsetLeft;
            const y = e.clientY- target.offsetTop;

            document.onmousemove = function(moveE){
                target.style.left = moveE.clientX - x + 'px'
                target.style.top = moveE.clientY - y + 'px'
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        })

    }
    handleButtonClick = () => {
        this.setState( prevState => {
            return { count: prevState.count + 2 }
        } )
    }
    onBeginTask = () => {
        setTimeout( () => this.setState( { count: this.state.count + 1 } ), 0 )
    }

    render() {
        const { count } = this.state
        return <div className={"task-with-different-priorities"}>
            <div className="counter">
                <button onClick={this.onBeginTask}>开始</button>
                <div>
                    {Array.from(new Array(180000)).map( (v,index) =>
                        <div key={index}>{count}</div>
                    )}
                </div>
            </div>
            <div className="drag-wrapper">
                <div
                    id={'drag-element'}
                    style={{
                        position: 'absolute',
                    }}
                >
                </div>
            </div>
        </div>
    }
}
export default SchedulerTask

// export default ClassComp