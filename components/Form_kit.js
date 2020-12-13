import React, { Component } from 'react'

export default class Form_kit extends Component {
    constructor(props) {
        super(props);
        this.props.data.map(item => {
            this["reference" + item.name] = React.createRef();
        })

        //init state:
        this.state = {
            errors: false, // to hold the form errors "EMPTY || EXPECTED TYPE vs THE GIVEN INPUT"
            sidebar: false, // sideBar appearence initial state
            sidebarInset: false // sideBar inset initial state
        }
    }

    // sideBar appearence:
    handleSideBarAppearence = () => {
        this.setState({
            sidebar: !this.state.sidebar
        }, () => {
            // waiting for the animation to finish before removng the inset that cover the page
            setTimeout(() => {
                this.setState({
                    sidebarInset: !this.state.sidebarInset
                })
            }, 700)
        })
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value // state field name depends on the given name
        })
    }


    requirementChecker = () => { // checks if the input is required but non value assigned
        let errorsChecker = [];  // array that returns the empty fields
        this.props.data.map(item => {
            let stateItem = this.state[`${item.name}`]
            if (item.required && !stateItem) {
                errorsChecker.push({ ...item, error: 'EMPTY_FIELD' })
            }
        })

        return errorsChecker;
    }



    typeChecker = () => { // checking the excpected type of the given value 
        let errorsChecker = []; // array that returns falsy typeof

        this.props.data.map(item => {
            let stateItem = this.state[`${item.name}`]
            
            switch (item.type) {
                case 'number':
                    if (typeof stateItem !== 'number') {
                        errorsChecker.push({ ...item, error: 'TYPE IS NOT NUMBER' })
                    }
                    break;
                case 'string':
                    if (typeof stateItem !== 'string') {
                        errorsChecker.push({ ...item, error: 'TYPE IS NOT STRING' })
                    }
                    break;
                case 'email':
                    // Regular expression to check email validation
                    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test(String(stateItem).toLowerCase())) {
                        errorsChecker.push({ ...item, error: 'The input given is not a valid email' })
                    }
                    break;
                default:
                    if (typeof stateItem !== 'string') {
                        errorsChecker.push({ ...item, error: 'TYPE IS NOT STRING.' })
                    }
                    break;
            }
        })

        return errorsChecker;
    }

    handleSubmit = (event) => {
        event.preventDefault(); // preveting the page from reloading

        // check if requered && empty then check type value
        if (this.requirementChecker().length !== 0) {
            this.setState({
                errors: this.requirementChecker(),
                sidebar: true,
                sidebarInset: true
            })
        } else if (this.typeChecker().length !== 0) {
            this.setState({
                errors: this.typeChecker(),
                sidebar: true,
                sidebarInset: true
            })
        } else {
            // success case
            this.props.handleSuccess()
        }
    }

    // focusing the clicked field
    handleFocusInput = (item) => {
        this.handleSideBarAppearence(); // closing sideBar
        this["reference" + item.name].current.focus();
        setTimeout(() => { // since the closing animation takes 700Ms
            this.setState({
                errors: [],
            })
        }, 700)
    }

    render() {
        let {
            data
        } = this.props;

        return (
            <div>
                <div className="mt-6">
                    <form action="#" method="POST" className="space-y-6">
                        {
                            data.map(item =>
                                <div key={item.id}>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        {item.title}
                                    </label>
                                    <div className="mt-1">
                                        <input ref={this["reference" + item.name]} name={item.name} type={item.type} autoComplete={item.autocomplete} required={item.isRequired} onChange={this.handleFormChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                            )
                        }

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    About us!
                                </a>
                            </div>
                        </div>

                        <div>
                            <button onClick={this.handleSubmit} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>

                {/* sidebar section */}
                <div>
                    <div className={`fixed ${this.state.sidebarInset && "inset-0"} overflow-hidden `}
                        style={{
                            background: '#5d5b5b3d'
                        }}
                    >
                        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex" aria-labelledby="slide-over-heading">
                            <div className={`w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 translate-x-${this.state.sidebar ? '0' : 'full'}`}>
                                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 id="slide-over-heading" className="text-lg font-medium text-red-800">
                                                It seams that something went Wrong
                                            </h2>
                                            <div className="ml-3 h-7 flex items-center">
                                                <button onClick={this.handleSideBarAppearence} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    <span className="sr-only">Close panel</span>
                                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                        <div className="absolute inset-0 px-4 sm:px-6">
                                            <div className="h-full border-gray-200" aria-hidden="true">
                                                {
                                                    this.state.errors && this.state.errors.map(item =>
                                                        <div key={item.id} className="mb-2">
                                                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                                                <div className="flex">
                                                                    <div className="flex-shrink-0">
                                                                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <p className="text-sm text-yellow-700">
                                                                            {item.error}
                                                                        </p>
                                                                        <button href="#" className="font-medium underline text-yellow-700 hover:text-yellow-600 text-left" onClick={() => { this.handleFocusInput(item) }}>
                                                                            Please checkout the field {item.title} one more time
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
