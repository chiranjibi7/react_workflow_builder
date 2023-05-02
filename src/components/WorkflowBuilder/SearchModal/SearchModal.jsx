import React, { useMemo, useState } from "react";
import { Modal, TextInput, Table, Pagination, Button} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import TailwindSelect from "react-tailwindcss-select";
import { data } from "./data";
import "./search.css";

function SearchModal({ isSearchModalVisible, setIsSearchModalVisible }) {
  const [searchText, setSearchText]=useState("");
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState(null);
  const [location, setLocation] = useState(null);

  const [tableData, setTableData]=useState(data);

  const [tagItem, setTagItem]=useState([]);

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

  const handleTextChange=(e)=>{
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleSearch=()=> {
    if(searchText){
    const searchKeywords = searchText.toLowerCase().split(' ');
    const filteredData = updatedData.filter((obj) => {
      const tempWords = obj.temp.split(" ");
      return searchKeywords.every((keyword) =>
        tempWords.some((word) => word.toLowerCase().includes(keyword.toLowerCase()))
      );
    });
    filteredData.sort((a, b) => {
      const aCount = a.temp.split(" ").reduce((count, word) => count + (searchKeywords.includes(word) ? 1 : 0), 0);
      const bCount = b.temp.split(" ").reduce((count, word) => count + (searchKeywords.includes(word) ? 1 : 0), 0);
      return bCount - aCount;
    });
    setTableData(filteredData);
    } else {
      setTableData(data);
    }
  };

  const handleCategoryChange = (value) => {
    if(value){
      setCategory(value);
      setTagItem(prevItem=>[...prevItem,value]);
    let searchKeywords=[];
    value.forEach(val=>searchKeywords.push(val.value.toLowerCase()));
    const filteredData = data.filter(item=>searchKeywords.includes(item.category.toLowerCase()));
    setTableData(filteredData);
    }else{
      setTableData(data);
    }
  };

  const handleLocationChange = (value) => {
   if(value){
    setLocation(value);
    let searchKeywords=[];
    value.forEach(val=>searchKeywords.push(val.value.toLowerCase()));
    const filteredData = data.filter(item=>searchKeywords.includes(item.location.toLowerCase()));
    setTableData(filteredData);
   }else{
    setTableData(data);
   }
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
          {/* searchbar section */}
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
          {/* multiselect section */}
          <div className="flex gap-6 w-3/4">
            <div className="w-full flex items-center">
              <p className="font-bold">Category:</p>
              <TailwindSelect
                // value={category}
                value={null}
                onChange={handleCategoryChange}
                options={categoryItems}
                isMultiple={true}
                className={{tagItem: () => 'isDisabled'}}
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
          {/* tags section */}
          <div className="flex flex-wrap gap-3 w-3/4 mb-3">
           {tagItem && tagItem.map(tag=>{
            console.log(tag)
            return <Button size="xs" pill={true} color="light">
            {tag[0].value}
            <IoCloseOutline className="ml-2" size={15}/>
         </Button>
           })}
          </div>
        
        {/* table section */}
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
