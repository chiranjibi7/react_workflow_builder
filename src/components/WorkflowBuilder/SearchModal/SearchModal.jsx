import React, { useMemo, useState } from "react";
import { Modal, TextInput, Table, Pagination, Button } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import TailwindSelect from "react-tailwindcss-select";
import { data } from "./data";
import "./search.css";

function SearchModal({ isSearchModalVisible, setIsSearchModalVisible }) {
  const [searchText, setSearchText]=useState("");
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState(null);
  const [location, setLocation] = useState(null);

  const [tableData, setTableData]=useState(data);

  const updatedData= useMemo(()=>{
    return data.map(item=>{
      let added_props="";
      for(let key in item){
        if(key==='category'){
          for(let i=0; i<2; i++){
            added_props+=item[key]+ " ";
          }
        } 
        else if(key==='workflow_name'){
          for(let i=0; i<10; i++){
            added_props+=item[key]+ " ";
          }
        }
        else if(key==='description'){
          for(let i=0; i<3; i++){
            added_props+=item[key]+ " ";
          }
        }
        else if(key==='tags'){
          for(let i=0; i<4; i++){
            added_props+=item[key]+ " ";
          }
        } else{
          for(let i=0; i<1; i++){
            added_props+=item[key]+ " ";
          }
        }  
      }
      return {...item, temp:added_props}
     });
  },[data])
  console.log(updatedData[1].temp);

  const handleTextChange=(e)=>{
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleSearch=()=> {
    // Filter out any records with zero matches
    if(searchText){
      const keywords = searchText.toLowerCase().split(' ');
      const filteredDictionary = updatedData.filter(item => {
        const descriptionKeywords = item.temp.toLowerCase().split(" ");
        const matches = keywords.filter(keyword => descriptionKeywords.includes(keyword.toLowerCase()));
        return matches.length > 0;
      });
    console.log(filteredDictionary)
      // Sort the filtered dictionary based on the number of matching keywords
      const sortedDictionary = filteredDictionary.sort((a, b) => {
        const aKeywords = a.temp.toLowerCase().split(" ");
        const bKeywords = b.temp.toLowerCase().split(" ");

        console.log(aKeywords)
    
        const aMatches = keywords.filter(keyword => aKeywords.includes(keyword.toLowerCase()));
        const bMatches = keywords.filter(keyword => bKeywords.includes(keyword.toLowerCase()));
    
        return bMatches.length - aMatches.length;
      });
      setTableData(sortedDictionary);
    } else {
      setTableData(data);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    let selectedData=[];
    value.forEach(val=>selectedData.push(val.value));
    console.log(selectedData)
    let filteredData=[];
    // filteredData=data.filter(item=>item.category===value.value);
    filteredData=data.filter(item=>{
      return selectedData.every(data=>item.category===data)
    })
    setTableData(filteredData);
  };

  const handleLocationChange = (value) => {
    setLocation(value);
    let filteredData=[];
    filteredData=data.filter(item=>item.location===value.value);
    console.log(filteredData)
    setTableData(filteredData);
  };

  let categoryItems=[];
  data.forEach(item=>{
    if(Object.keys(item).includes("category")){
        categoryItems.push({value:item["category"],label:item["category"]});
    }
  });
  categoryItems = categoryItems.filter((obj, index, self) => 
  index === self.findIndex((t) => (
    t.value === obj.value
  ))
);

  let locationItems=[];
  data.forEach(item=>{
    if(Object.keys(item).includes("location")){
        locationItems.push({value:item["location"],label:item["location"]});
    }
  });
  locationItems = locationItems.filter((obj, index, self) => 
  index === self.findIndex((t) => (
    t.value === obj.value
  ))
);

  return (
    <Modal
      size="7xl"
      dismissible={true}
      show={isSearchModalVisible}
      onClose={() => setIsSearchModalVisible(false)}
    >
      <Modal.Header>Process Node Search</Modal.Header>

      <Modal.Body className="modal-content w-full">
        <div className="flex flex-col gap-3 w-full items-center mb-3">
          <div className="flex relative w-1/2">
            <TextInput
              type="text"
              sizing="md"
              required={true}
              className="grow"
              value={searchText}
              onChange={handleTextChange}
            />
          <Button className="absolute right-0" onClick={()=>handleSearch()} size="lg">
            <AiOutlineSearch/>
          </Button>
          </div>
          <div className="flex gap-6 w-3/4">
            <div className="w-full flex items-center">
              <p className="font-bold">Category:</p>
              <TailwindSelect
                value={category}
                onChange={handleCategoryChange}
                options={categoryItems}
                isMultiple={true}
              />
            </div>
            <div className="w-full flex items-center">
            <p className="font-bold">Tags:</p>
              <TailwindSelect
                value={location}
                onChange={handleLocationChange}
                options={locationItems}
              />
            </div>
            <div className="w-full flex items-center">
            <p className="font-bold">Location:</p>
              <TailwindSelect
                value={location}
                onChange={handleLocationChange}
                options={locationItems}
                isMultiple={true}
              />
            </div>
          </div>
        
       <Table hoverable={true} >
          <Table.Head>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Workflow Name</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Latest rev</Table.HeadCell>
            <Table.HeadCell>Revision Status</Table.HeadCell>
            <Table.HeadCell>Updated At</Table.HeadCell>
          </Table.Head>
          <Table.Body className="table-modal-content">
            {tableData.map(data=>{
                return  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                 {data.category}
                </Table.Cell>
                <Table.Cell>{data.workflow_name}</Table.Cell>
                <Table.Cell>{data.description}</Table.Cell>
                <Table.Cell>{data.latest_rev}</Table.Cell>
                <Table.Cell>{data.revision_Status}</Table.Cell>
                <Table.Cell>{data.updated_at}</Table.Cell>
              </Table.Row>
            })}
          </Table.Body>
        </Table>
        </div>
      </Modal.Body>

      <Modal.Footer>
      <Pagination currentPage={7} showIcons={true} totalPages={100} />
      </Modal.Footer>
 </Modal>
  );
}

export default SearchModal;
