import React, { Component } from 'react';

class MyList extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            loading: true,
            error: null,
            data: null
        };
    }

    componentDidMount() {
        const url = 'https://api.github.com/search/repositories?q=javascript&sort=stars';
        $.getJSON(url)
            .done(
                (value) => this.setState(
                    {
                        loading: false,
                        data: value
                    }
                )
            )
            .fail(
                (jqXHR, textStatus) => this.setState(
                    {
                        loading: false,
                        error: jqXHR.status
                    }
                )
            );

    }
    render() {
        if (this.state.loading) {
            return <span>Loading...</span>;
        } else if (this.state.error !== null) {
            return <span>Error: {this.state.error}</span>;
        } else {
            // var projects = this.state.data.items;
            // var results = [];
            // projects.forEach(p => {
            //     var item = <li>{p.name}</li>;
            //     results.push(item);
            // });
            return (<div>
                <p>API 数据获取成功</p>
                <ul>{
                        this.state.data.items.forEach(item => {
                            <li>{item.name}</li>
                        })
                    }
                </ul>
            </div>);
        }
    }
}

export default MyList;
