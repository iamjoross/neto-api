import React, { Component } from 'react';
import Neto from './util/neto';
import uuid from 'uuid';
import _ from 'lodash';
import Environment from './constants/Environment';
import ReactLoading from 'react-loading';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col, Button } from 'reactstrap';

import './App.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      loading: false,
      rows: [],
      fetchedData: {},
      TableHeaderColumns: [],
      customersTableField: [
        "Id",
        "Username",
        "Email Address",
        "Newsletter Subscriber",
        "Bill Company",
        "Bill Street Address Line 1",
        "Bill Street Address Line 2",
        "Bill City",
        "Bill State",
        "Bill Post Code",
        "Bill Country",
        "Ship Post Code",
        "Ship Address Line2",
        "Ship Address Line 1",
        "Ship State",
        "Active",
        "Ship Company",
        "Ship Country",
        "Default Discount Percentage",
        "Ship City",
        "Referral Commission",
        "Ship Last Name",
        "Ship First Name",
        "VIP Customer",
        "Sales Channel",
      ],
      ordersTableField: [
        "Order ID",
        "Order Status",
        "Approved",
        "Username",
        "Email",
        "Payment Method",
        "Shipping Method",
        "Amount Paid",
        "Date Paid",
        "Order Line SKU",
        "Order Line Qty",
        "Order Line Description",
        "Order Line Unit Price",
        "Order Line Unit Cost",
        "Shipping Discount Amount",
        "Order Line Serial Number",
        "Payment Due Date",
        "User Group",
        "Sales Channel",
        "Order Type",
        "Date Invoiced",
        "Shipping Cost",
        "Payment Terms",
        "Date Placed"
      ]
    };

    this.TableHeaderColumns = this.state.customersTableField.map( (field, idx) => {

      this.headerProps = {
        dataField: field.toLocaleLowerCase().replace(/\s+/g, ''),
        name: field.toLocaleLowerCase().replace(/\s+/g, ''),
        key: uuid.v4(),
        width: '200'
      };

      if(idx == 0){
        return <TableHeaderColumn {...this.headerProps} isKey={true}>{field}</TableHeaderColumn>
      }

      return <TableHeaderColumn {...this.headerProps} >{field}</TableHeaderColumn>
    })

    this._getCustomer = this._getCustomer.bind(this);
    this._getOrders = this._getOrders.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  } 

  _getCustomer(){
    
    this.TableHeaderColumns = this.state.customersTableField.map( (field, idx) => {

      this.headerProps = {
        dataField: field.toLocaleLowerCase().replace(/\s+/g, ''),
        name: field.toLocaleLowerCase().replace(/\s+/g, ''),
        key: uuid.v4(),
        width: '200'
      };

      if(idx == 0){
        return <TableHeaderColumn {...this.headerProps} isKey={true}>{field}</TableHeaderColumn>
      }

      return <TableHeaderColumn {...this.headerProps} >{field}</TableHeaderColumn>
    })

    this.setState({
      loading: true,
      TableHeaderColumns: this.TableHeaderColumns
    });

    const api = new Neto({
      uri: Environment.URI,
      api_key: Environment.KEY
    });

    const customersFilter = {
      "Filter": {
        "Type": [
          "Customer"
        ],
        "Active": [
          "True"
        ],
        "OutputSelector": [
          "Username", "EmailAddress", "NewsletterSubscriber", "Company", "BillingAddress",
          "ShippingAddress", "Active", "DefaultDiscounts", "ReferralCommission", "SalesChannel"
        ]
      }
    };

    var products = {
      "Filter": {
        "IsActive": [
          "True"
        ],
        "Page": 1,
        "Limit": 50,
        "OutputSelector": [
          "ParentSKU",
          "Name",
          "Brand",
          "IsActive",
          "Approved",
          "RRP",
          "CostPrice",
          "DefaultPrice",
          "Categories",
          "ShippingCategory",
          "SEOMetaDescription",
          "SEOPageTitle",
          "PromotionPrice",
          "PromotionStartDate",
          "PromotionExpiryDate",
          "DateAdded",
          "WarehouseQuantity",
          "PriceGroups"
        ]
      }
    };

    var orders = {
      "Filter": {
        "OrderStatus": [
          "New", "New Backorder", "Backorder Approved", "Pick", "Pack", "Pending Pickup", "Pending Dispatch", "Dispatched", "Pending Dispatch", "Dispatched", "Cancelled", "Uncommitted", "On Hold"
        ],
        "OutputSelector": [
          "ShippingOption",
          "OrderStatus",
          "Username",
          "Email",
          "OrderPayment",
          "DatePaid",
          "OrderLine",
          "OrderLine.UnitPrice",
          "OrderLine.CostPrice",
          "OrderLine.SerialNumber",
          "ShippingDiscount",
          "UserGroup",
          "SalesChannel",
          "OrderType",
          "DateInvoiced",
          "OrderLine.Shipping",
          "OrderPayment.PaymentType",
          "CompleteStatus",
          "DatePlaced",
          "DateInvoiced",
          "DateRequired",
          "ShippingOption"
        ]
      }
    };
    
    api.getCustomer(customersFilter, (err, res) => {
      if (err) console.log(err);

      this.setState({
        fetchedData : res.Customer
      });
      // console.log(this.state.customers);

      let _rows = [];
      _.map(this.state.fetchedData, (customer, idx) =>{
        _rows = [
          ..._rows,{
            "id": idx,
            "username": customer.Username,
            "emailaddress": customer.EmailAddress,
            "newslettersubscriber": customer.NewsletterSubscriber,
            "billcompany": customer.BillingAddress.BillCompany,
            "billstreetaddressline1": customer.BillingAddress.BillStreetLine1,
            "billstreetaddressline2": customer.BillingAddress.BillStreetLine2,
            "billcity": customer.BillingAddress.BillCity,
            "billstate": customer.BillingAddress.BillState,
            "billpostcode": customer.BillingAddress.BillPostCode,
            "billcountry": customer.BillingAddress.BillCountry,
            "shippostcode": customer.ShippingAddress.ShipPostCode,
            "shipAddressline2": customer.ShippingAddress.ShipStreetLine1,
            "shipaddressline1": customer.ShippingAddress.ShipStreetLine12,
            "shipstate": customer.ShippingAddress.ShipState,
            "active": customer.Active,
            "shipcompany": customer.ShippingAddress.ShipCompany,
            "shipcountry": customer.ShippingAddress.ShipCountry,
            "defaultdiscountpercentage": customer.DefaultDiscounts,
            "shipcity": customer.ShippingAddress.ShipCity,
            "referralcommission": customer.ReferralCommission,
            "shiplastname": customer.ShippingAddress.ShipFirstName,
            "shipfirstname": customer.ShippingAddress.ShipLastName,
            "vIPcustomer": '',
            "saleschannel": customer.SalesChannel,
          }]
      });
      

      this.setState({
        rows : _rows
      });

      console.log(this.state);

      this.setState({
        loading: false
      });
    });
  }

  _getOrders(){

    this.TableHeaderColumns = this.state.ordersTableField.map( (field, idx) => {

      this.headerProps = {
        dataField: field.toLocaleLowerCase().replace(/\s+/g, ''),
        name: field.toLocaleLowerCase().replace(/\s+/g, ''),
        key: uuid.v4(),
        width: '200'
      };

      if(idx == 0){
        return <TableHeaderColumn {...this.headerProps} isKey={true}>{field}</TableHeaderColumn>
      }

      return <TableHeaderColumn {...this.headerProps} >{field}</TableHeaderColumn>
    })

    this.setState({
      loading: true,
      TableHeaderColumns: this.TableHeaderColumns,
    });

    const api = new Neto({
      uri: Environment.URI,
      api_key: Environment.KEY
    });

    var ordersFilter = {
      "Filter": {
        "OrderStatus": [
          "New", "New Backorder", "Backorder Approved", "Pick", "Pack", "Pending Pickup", "Pending Dispatch", "Dispatched", "Pending Dispatch", "Dispatched", "Cancelled", "Uncommitted", "On Hold"
        ],
        "OutputSelector": [
          "ShippingOption",
          "OrderStatus",
          "Username",
          "Email",
          "OrderPayment",
          "DatePaid",
          "OrderLine",
          "OrderLine.UnitPrice",
          "OrderLine.CostPrice",
          "OrderLine.SerialNumber",
          "ShippingDiscount",
          "UserGroup",
          "SalesChannel",
          "OrderType",
          "DateInvoiced",
          "OrderLine.Shipping",
          "OrderPayment.PaymentType",
          "CompleteStatus",
          "DatePlaced",
          "DateInvoiced",
          "DateRequired",
          "ShippingOption"
        ]
      }
    };
    
    api.getOrder(ordersFilter, (err, res) => {
      if (err) console.log(err);

      this.setState({
        fetchedData : res.Order
      });
      console.log(res.Order);

      let _rows = [];
      _.map(this.state.fetchedData, (order, idx) =>{
        // console.log(order.OrderPayment[0]);
        _rows = [
          ..._rows,{
            "id": idx,
            "orderid": order.OrderID,
            "orderstatus": order.OrderStatus,
            "approved": '',
            "username": order.Username,
            "email": order.Email,
            // "paymentmethod": order.OrderPayment[0].PaymentType,
            "shippingmethod": order.ShippingOption,
            // "amountpaid": order.OrderPayment[0].Amount,
            // "datepaid": order.OrderPayment[0].DatePaid,
            "orderlinesku": order.OrderLine.OrderLineID,
            "orderlineqty": order.OrderLine.Quantity,
            "orderlinedescription": '',
            "orderlineunitprice": order.OrderLine.UnitPrice,
            "orderlineunitcost": order.OrderLine.CostPrice,
            "shippingdiscountamount": order.ShippingDiscount,
            "orderlineserialnumber": order.OrderLine.SerialNumber,
            "paymentduedate": order.DateRequired,
            "usergroup": order.UserGroup,
            "saleschannel": order.SalesChannel,
            "ordertype": order.OrderType,
            "dateinvoiced": order.DateInvoiced,
            "shippingcost": '',
            // "paymentterms": order.OrderPayment[0].PaymentType,
            "dateplaced": order.DatePlaced
          }]
      });
      
      console.log(_rows);
      this.setState({
        rows : _rows
      });

      // console.log(this.state);

      this.setState({
        loading: false
      });
    });
  }

  render() {

    return (
      <div className="App">
        <div>
          
          <Navbar color="faded" light toggleable>
            <NavbarToggler right onClick={this.toggle} />
            <NavbarBrand href="/">Neto API v Alpha</NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://www.neto.com.au/api/">API  Documentation</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Container className="toolbar">
            <Row>
              <Col>
                <Button color="primary" onClick={this._getCustomer} >Get Customer</Button>{' '}
                <Button color="warning" onClick={this._getOrders}>Get Orders</Button>{' '}
                <Button color="danger">danger</Button>{' '}
                { this.state.loading ? <ReactLoading className="loading" type="bars" color="#444" height='50px' width='50px' /> : null }
                </Col>
              </Row>
            </Container>
          <BootstrapTable data={this.state.rows} striped={true} hover={true}>
              {this.TableHeaderColumns}
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

export default App;
