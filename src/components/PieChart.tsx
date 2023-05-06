import { useEffect } from 'react';
import {Pie} from '@ant-design/charts';
import userStore from '../Store/Store'

const PieChart = () => {
  const {users,fetchUsers}=userStore();

  useEffect(()=>{
    fetchUsers();
  },[])

  const allCities=users.map((user)=>user.address.city);
  const percentages = allCities.reduce((acc: { [key: string]: number }, city) => {
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(percentages).map(([city, count]) => ({
    type: city,
    value: count,
    percentage: ((count / allCities.length) * 100).toFixed(2) + "%",
  }));

  const config = {
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "spider",
      content: "{name}\n{percentage}",
    },
    height: 800,
    width: 800,
  };
  return (
  <Pie {...config}/>
  )
}

export default PieChart

