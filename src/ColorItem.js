import React, { Component } from 'react';

class ColorItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false
        };

        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.onEditCancel = this.onEditCancel.bind(this);
    }

    onDelete() {
        const { onDelete, range } = this.props;

        onDelete(range);
    }

    onEdit() {
        this.setState({ isEdit: true });
    }

    onEditSubmit(event) {
        event.preventDefault();

        this.props.onEditSubmit(this.nameInput.value, this.priceInput.value, this.props.name);

        this.setState({ isEdit: false });
    }

    onEditCancel() {
        this.setState({ isEdit: false });
    }

    render() {
        const { domain, range } = this.props;

        return (
            <div style={{ backgroundColor: 'gray' }}>
                {
                    this.state.isEdit
                        ? (
                            <form onSubmit={this.onEditSubmit}>
                                <input
                                    placeholder="Name"
                                    ref={domainInput => this.domainInput = domainInput}
                                    defaultValue={domain} />

                                <input
                                    placeholder="Price"
                                    ref={rangeInput => this.rangeInput = rangeInput}
                                    defaultValue={range} />

                                <button> Save </button>
                                {` | `}
                                <button onClick={this.onEditCancel}> Cancel </button>
                            </form>
                        )
                        : (
                            <div>
                                <span> {domain} </span>
                                {` | `}
                                <span> {range} </span>
                                {` | `}
                                <button onClick={this.onEdit}> Edit </button>
                                {` | `}
                                <button onClick={this.onDelete}> Delete </button>
                            </div>
                        )
                }

            </div>
        );
    }
}

export default ColorItem;
