import { getData,Gettab} from "./data.js";

const list = document.querySelector(".list")
const list_wrapper = document.querySelector(".list_wrapper");
const input = document.querySelector(".input");


const renderList = async (item) => {
    const data = await getData(item)

    list.innerHTML = data.map((item) => `
    <li class="bg-[#fff] flex justify-between items-center pt-[28px] pr-[38px] pb-[28px] pl-[38px] rounded-[10px] mb-[20px] ">
    <div class="flex gap-[40px]">
        <div class="w-[40px] h-[53px] pt-[14px] pb-[8px] bg-[#f2f4fe] rounded-[10px] text-center">
            <div class="pl-[16px] pr-[16px] ">
                <img src="./img/arrow_top.svg" alt="img" />
            </div>
            <p class="text-[#3a4374] pl-[9px] pr-[9px] text-[13px] font-[700] mb-[8px]">${item.id}</p>
        </div>
        <div>
            <h2 class="font-bold text-[18px] text-[#3a4374] mb-[4px]">${item.title}</h2>
            <p class="font-normal text-[16px] text-[#647196] mb-[12px]">${item.description}</p>
            <a class="bg-[#f2f4ff] rounded-[10px] pt-[5px] pr-[16px] pb-[5px] pl-[16px] font-semibold text-[13px] text-[#4661e6]" href="#">${item.type}</a>
        </div>
    </div>
    <div class="flex gap-[8px] justify-center">
        <img src="./img/com.svg" alt="img">
        <p>${item.votes}</p>
    </div>
</li>


    `).join("")
}



const render = async (value) => {
    if(value.length > 2){
        try {
            const res = await fetch(`https://product-feedback-data.vercel.app/all?title_like=${value}`)
            const data = await res.json()
    
            list.innerHTML = data.map((item) => `
            <li class="bg-[#fff] flex justify-between items-center pt-[28px] pr-[38px] pb-[28px] pl-[38px] rounded-[10px] mb-[20px] ">
    <div class="flex gap-[40px]">
        <div class="w-[40px] h-[53px] pt-[14px] pb-[8px] bg-[#f2f4fe] rounded-[10px] text-center">
            <div class="pl-[16px] pr-[16px] ">
                <img src="./img/arrow_top.svg" alt="img" />
            </div>
            <p class="text-[#3a4374] pl-[9px] pr-[9px] text-[13px] font-[700] mb-[8px]">${item.id}</p>
        </div>
        <div>
            <h2 class="font-bold text-[18px] text-[#3a4374] mb-[4px]">${item.title}</h2>
            <p class="font-normal text-[16px] text-[#647196] mb-[12px]">${item.description}</p>
            <a class="bg-[#f2f4ff] rounded-[10px] pt-[5px] pr-[16px] pb-[5px] pl-[16px] font-semibold text-[13px] text-[#4661e6]" href="#">${item.type}</a>
        </div>
    </div>
    <div class="flex gap-[8px] justify-center">
        <img src="./img/com.svg" alt="img">
        <p>${item.votes}</p>
    </div>
</li>
            
            `).join("")
        } catch (error) {
            
        }
    }else{
        list.innerHTML = ""
    }
    
}


const useDebounce = () => {
        let id;
        return () => {
          list.innerHTML = "<h1 class=load>жди молодой человек....</h1>";
          clearTimeout(id);
          id = setTimeout(() => {
            render(input.value);
          }, 600);
        };
      };
      
      const debounce = useDebounce();
      
    
    
    input.addEventListener("keyup", (event) => {
        if(event.key == "Enter"){
            debounce()
        }
        
    })
    

const tabRend = async () => {
    const data = await Gettab()

    list_wrapper.innerHTML = data.map((item) => `
    <li>
    <button data-item="${item}" class="button text-[13px] font-semibold text-[#4661e6] border-none rounded-[10px] bg-[#f2f4ff] py-[5px] px-[16px] hover:text-[#fff] hover:bg-[#4661e6] ">${item}</button>
    </li>
    `).join("")
    
    
}


list_wrapper.addEventListener("click", (e) => {
    const item = e.target.dataset.item;
    if (item) {
        renderList(item);
        const buttons = document.querySelectorAll(".button");
        buttons.forEach((button) => {
            button.style.color = "";
         
        });
        e.target.style.color = "red";
       
        
    }
})



tabRend()
renderList()
