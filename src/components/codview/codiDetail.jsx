import React from 'react';
import { useState, useEffect } from 'react';
import "./codiDetail.css";
import {ReconciliationOutlined} from "@ant-design/icons";
import search from "./search.png";
import http from "../httpServices/httpService";

const CodiDetail = () => {
  
    const [cryptoData, setcryptoData] = useState([]);
    const [page, setPage] = useState(1);
    const [filterData, setfilterData] = useState("")

   
    useEffect(() => {
        try{
          async function fetchData(){
              let response = await http.get("/codinovaData");
              let {data} = response;
              setcryptoData(data);
          }
          fetchData()
        }
        catch(ex){
            console.log(ex);
        }
    },[])

    const handlPage = (num) => setPage(page + num);

    const handlFilterValue = (e) => {
        setfilterData(e.target.value);
        setPage(1);
    }

    function formatNumber(number) {
        let billion = 1000000000;
        const crore = 10000000;
        const lakh = 100000;
        const thousand = 1000;
      
        if (number >= billion) {
            return (number / billion).toFixed(2) + 'billion';
          }
        else if (number >= crore) {
          return (number / crore).toFixed(2) + ' Cr';
        } else if (number >= lakh) {
          return (number / lakh).toFixed(2) + ' L';
        } else if (number >= thousand) {
          return (number / thousand).toFixed(2) + ' K';
        }else{
        return number.toString();
        }
      }

    let sortedData = cryptoData.sort((a,b) => b.volume_1day_usd - a.volume_1day_usd);
    let displayData = filterData ? sortedData.filter((ele) => ele.exchange_id === filterData).length>0 ? sortedData.filter((ele) => ele.exchange_id === filterData) : sortedData  : sortedData;

    let startIndex = 0;
    let endIndex = 0;
    let length = 0;

    length = displayData.length > 0 ? displayData.length : 0;
    startIndex = (page - 1) * 10;
    endIndex = length > startIndex + 9 ? startIndex + 9 : length - 1;
    let displayData1 = displayData.length > 0 ? displayData.filter((ele, index) => index >= startIndex && index <= endIndex) : [];

    console.log("CryptoData", cryptoData);
  return (
    <div>
        <h2 className='top-heading'>Top crypto exchanges</h2>
        <p className='top-line'>Compare all 190 top crypto exchanges. The list is ranked by trading volume</p>
        <p className='heading'>Exchanges</p>
        <hr className='horizental-line'/>
        <div className='input-wrapper'>
            <div className='in-icon'><ReconciliationOutlined /></div>
            <input type='text' id='filterData' className='filterData' placeholder='Find an exchanges' onChange={(e) => handlFilterValue(e) } />
            <div className='serch-icon'>
                <img src={search} alt='' className='search-image'  />
            </div>
        </div>
        <section>
            <div className='table-header'>
                <div>Exchanges</div>
                <div>24H TRADE VOLUME</div>
            </div>
            <hr className='horizental-line'/>
            {displayData1.map((ele, index) => (
                <>
                <div className='crypto-wrapper'>
                    <div className='series-binance'>
                       <p>{index+1}</p>&nbsp;
                       <div><img src={ele.iconUrl} className='icon-exchange' />&nbsp;</div>
                       <p>{ele.exchange_id}</p>
                    </div>
                    <div>${formatNumber(ele.volume_1day_usd)}</div>
                </div>
                   <hr className='horizental-line'/>
                   </>
            ))}
        </section>
        <div className='pagination'>
        <div>
          {startIndex > 1 ? <button className='prev' onClick={() => handlPage(-1)}>Prev</button> : ""}
        </div>
        <div className='next-end'>{endIndex < length - 1 ? <button className='next' onClick={() => handlPage(1)}>Next</button> : ""}</div>
      </div>
    </div>
  )
}

export default CodiDetail;