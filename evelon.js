const { ethers } = require("ethers");
const axios = require("axios");
const { EvelonAbi } = require("./abi");
const FormData = require('form-data');
class EvelonSDK {
  constructor(config) {
    this.apiKey = config.apiKey;
    if (config.chainId != 5 && config.chainId != 1287 && config.chainId != 65) {
      throw new Error("Invalid token ID");
    }
    this.chainId = config.chainId;
    const privateKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    if (config.chainId == 5) {
      this.collectionName = "Evelon721";
      this.contractAddress = "0xECeBd61c19B164b890Ef815e8096C01E0DbBF1aF";
      let provider = new ethers.JsonRpcProvider(
        "https://ethereum-goerli.publicnode.com"
      );
      const signer = new ethers.Wallet(privateKey, provider);
      this.contract = new ethers.Contract(
        "0xECeBd61c19B164b890Ef815e8096C01E0DbBF1aF",
        EvelonAbi,
        signer
      );
    } else if (config.chainId == 1287) {
      this.collectionName = "Evelon721MoonBeam";
      this.contractAddress = "0x64cc19a5C10DBbA2b4a5b1E81F7999728763aBae";
      let provider = new ethers.JsonRpcProvider(
        "https://rpc.testnet.moonbeam.network"
      );
     const signer = new ethers.Wallet(privateKey, provider);
      this.contract = new ethers.Contract(
        "0x64cc19a5C10DBbA2b4a5b1E81F7999728763aBae",
        EvelonAbi,
        signer
      );
    } else if (config.chainId == 65) {
      this.collectionName = "Evelon721Okx";
      this.contractAddress = "0x83795D6E0aF10d0ce81280aF2Eb4e637E5f7B419";
      let provider = new ethers.JsonRpcProvider(
        "https://exchaintestrpc.okex.org"
      );
      const signer = new ethers.Wallet(privateKey, provider);
      this.contract = new ethers.Contract(
        "0x83795D6E0aF10d0ce81280aF2Eb4e637E5f7B419",
        EvelonAbi,
        signer
      );
    }
  }

  async getAllNFTs(userAddress)  {
    return await this.contract.getAllTokensByAddress(userAddress);
  }

  async modifyNFT(tokenId, name,description,image,attributes ){
    console.log(this.apiKey)
    const formdata = new FormData(); 

    formdata.append("collection_id", tokenId.toString()+this.collectionName);
    formdata.append("name", name);
    formdata.append("description", description);
      formdata.append("dynamic", 0);

    if(typeof image == "object"){
    formdata.append("image",image, " ");

    }else{
    formdata.append("image",image);
    }


    attributes.map((val, index) => {
          formdata.append("attributes[][trait_type]", val.trait_type);
          formdata.append("attributes[][value]", val.value);
        });             
  
   const data= await  axios.put("https://evelon-backend.herokuapp.com/api/metadata_nfts?",                
                formdata  
  , {
                headers:{  
                  'x-api-key': "test_ev_cd153f49193e693ec0434ecb52a9c5a1560d7e13",
                }
              });
              return data;

  }

 
}

module.exports = { EvelonSDK };


