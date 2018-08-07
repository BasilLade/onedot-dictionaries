import React, { Component } from 'react';

class ProductItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isProductEdit: false
        };

        this.onProductDelete = this.onProductDelete.bind(this);
        this.onProductEdit = this.onProductEdit.bind(this);
        this.onProductEditSubmit = this.onProductEditSubmit.bind(this);
        this.onProductEditCancel = this.onProductEditCancel.bind(this);
    }

    onProductDelete() {
        const { onProductDelete, name } = this.props;

        onProductDelete(name);
    }

    onProductEdit() {
        this.setState({ isProductEdit: true });
    }

    onProductEditSubmit(event) {
        event.preventDefault();

        this.props.onProductEditSubmit(this.nameInput.value, this.priceInput.value, this.props.name);

        this.setState({ isProductEdit: false });
    }

    onProductEditCancel() {
        this.setState({ isProductEdit: false });
    }

    render() {
        const { name, color, price } = this.props;

        return (
            <div style={{ backgroundColor: 'gray' }}>
                {
                    this.state.isEdit
                        ? (
                            <form onSubmit={this.onProductEditSubmit}>
                                <input
                                    placeholder="Name"
                                    ref={nameInput => this.nameInput = nameInput}
                                    defaultValue={name} />

                                <select >
                                    {
                                        this.props.colors.map(color => {
                                            return (
                                                <option
                                                    key={color.domain}
                                                    value={color.domain}/>
                                                    {color.domain}
                                                </option>
                                            );
                                        })
                                    }
                                </select>

                                <input
                                    placeholder="Price"
                                    ref={priceInput => this.priceInput = priceInput}
                                    defaultValue={price} />

                                <button> Save </button>
                                {` | `}
                                <button onClick={this.onProductEditCancel}> Cancel </button>
                            </form>
                        )
                        : (
                            <div>
                                <span> {name} </span>
                                {` | `}
                                <span> {color} </span>
                                {` | `}
                                <span> CHF {price} </span>
                                {` | `}
                                <button onClick={this.onProductEdit}> Edit </button>
                                {` | `}
                                <button onClick={this.onProductDelete}> Delete </button>
                            </div>
                        )
                }

            </div>
        );
    }
}

export default ProductItem;
