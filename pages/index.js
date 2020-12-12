import React, { Component } from 'react'

import Form_header from "../components/Form_header";
import Form_kit from "../components/Form_kit";
import Success from "../components/Success";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    }
  }

  handleSuccess = () => {
    this.setState({
      success: !this.state.success
    })
  }

  render() {
    let data = [ //text inputs data
      {
        id: "0000", //id that could be generated with UUID 
        name: "field1", // name of the text input
        title: "Input 1", // title label
        type: "string", // expected given value
        required: true, // in case the user leave it empty
        autocomplete: 'name' // autocomplete type
      },
      {
        id: "0001",
        name: "field2",
        title: "Input 2",
        type: "string",
        required: true,
        autocomplete: 'nickname'
      },
      {
        id: "0003",
        name: "field3",
        title: "Input 3",
        type: "string",
        required: true,
        autocomplete: 'name'
      },
      {
        id: "0004",
        name: "field4",
        title: "Input 4",
        type: "string",
        required: true,
        autocomplete: 'name'
      },
      {
        id: "0005",
        name: "field5",
        title: "Input 5",
        type: "string",
        required: true,
        autocomplete: 'name'
      },
      {
        id: "0006",
        name: "field6",
        title: "Input 6",
        type: "string",
        required: true,
        autocomplete: 'name'
      },
      {
        id: "0007",
        name: "field 7",
        title: "Input 7",
        type: "string",
        required: true,
        autocomplete: 'name'
      },
    ]

    return (
      <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 z-40 bg-white">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* list header components */}
            <div>
              <img className="h-20 w-auto" src="./img/myLogo.png" alt="matboud" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Create a new account.
            </h2>
              <p className="mt-2 text-sm text-gray-600 max-w">
                You're already a member? &nbsp;
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
              </a>
              </p>
            </div>

            <div className="mt-8">
              <Form_header />

              <Form_kit
                data={data}
                handleSuccess={this.handleSuccess}
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:block relative w-0 flex-1 ">
          <img className=" fixed z-1 inset-0 h-full w-full object-cover z-1" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
        </div>
        {
          this.state.success &&
          <div className="z-40 fixed right-0">
            <Success
              handleSuccess={this.handleSuccess}
            />
          </div>
        }
      </div>
    )
  }
}
