// Project entry file
import React, { Component } from 'react'
import { render } from 'react-dom'
import Routers from './router/router.jsx'

import './static/css/base.css'
import './static/css/public.css'

// Components are rendered to real dom nodes
render(
	<Routers />,
	document.getElementById('app')
)