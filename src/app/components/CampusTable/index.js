import React, { Component } from "react"
import {RaisedButton, TextField} from "material-ui"
import {green500, blue500, orange500, orange600} from "material-ui/styles/colors"
import moment from 'moment'
import {PageTitle} from "./../../components/PageTitle"
import MainMenu from "../MainMenu"
import "./styles.scss"

/**
 * imported others Library *
 **/
import * as constant from "./constant"
import { Enhance } from '../../HOC/fetchingData'


const data = 

const style = {
  orange: {
   borderColor: orange600,
 },
  content_full: {
   marginLeft:0,
   transition:'1s all ease',
 },
  content_less: {
   marginLeft:250,
   transition:'1s all ease',
 }
};