import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InFoIcon from '@material-ui/icons/Info';
import Team from '@material-ui/icons/Person';

import { NavLink} from "react-router-dom";


export const  MainListItems =({color})=> (

  <div>
 
    <NavLink style={{color:color.colorHome}}  to='/'>
    <ListItem button >
    <ListItemIcon color={color.colorHome} >
     <DashboardIcon  htmlColor={color.colorHome}  lightingColor={color.colorHome}  />
    </ListItemIcon>
    <ListItemText primary="Quản lí style" />
  </ListItem>
    </NavLink>



    <NavLink style={{color:color.colorNews}} to='/newsAdmin'>
  <ListItem button>
    <ListItemIcon>
      <AssignmentIcon   htmlColor={color.colorNews}  lightingColor={color.colorNews} />
    </ListItemIcon>
    <ListItemText primary="Quản lí tạo đặt lịch" />
  </ListItem>
  </NavLink>

  <NavLink style={{color:color.colorContact}} to='/managercalendarcut'>
  <ListItem button>
    <ListItemIcon>
      <LayersIcon htmlColor={color.colorSlider}  lightingColor={color.colorSlider} />
    </ListItemIcon>
    <ListItemText primary="Quản lí khách đặt" />
  </ListItem>
  </NavLink>

  
  <NavLink style={{color:color.colorCustomer}} to='/customer'>
  <ListItem button>
    <ListItemIcon>
      <BarChartIcon htmlColor={color.colorCustomer}  lightingColor={color.colorCustomer}  />
    </ListItemIcon>
    <ListItemText primary="Sẩn phẩm" />
  </ListItem>
  </NavLink>

  <NavLink style={{color:color.colorOder}} to='/oders'>
  <ListItem button>
    <ListItemIcon>
      <BarChartIcon htmlColor={color.colorOder}  lightingColor={color.colorOder}  />
    </ListItemIcon>
    <ListItemText primary="Sản phẩm khách đặt" />
  </ListItem>
  </NavLink>
</div>
);




export const SecondaryListItems =({color})=>(

<div>
    <ListSubheader inset>Thông tin</ListSubheader>
    <NavLink style={{color:color.colorInfo}} to='/updateinfomation'>
    <ListItem button>
      <ListItemIcon>
        <InFoIcon htmlColor={color.colorInfo}  lightingColor={color.colorInfo} />
      </ListItemIcon>
      <ListItemText primary="Thông tin công ty" />
    </ListItem>
    </NavLink>

    <NavLink style={{color:color.colorTeam}} to='/updateteam'>
    <ListItem button>
      <ListItemIcon>
        <Team htmlColor={color.colorTeam}  lightingColor={color.colorTeam} />
      </ListItemIcon>
      <ListItemText primary="Quản lí cán bộ" />
    </ListItem>
    </NavLink>


  </div>
  )
  
