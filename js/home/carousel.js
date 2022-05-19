import Ajax from "../../service/ajax";

const carouselControl = `
<button class="carousel-control carousel-control-left carousel-control-hover">
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-arrow-left"></use>
</svg>
</button>
<button class="carousel-control carousel-control-right carousel-control-hover">
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-arrow-right"></use>
</svg>
</button>
`
const carousel = {
    data:[],
    currentIndex:0,
    times:2000,
    animationTimes:0.5,
    autoCycleTimer:new Set(),
};
export function carouselRender(data) {
    let carouselItem = "";
    let carouselIndicatorsLi = "";
    const wrapper = document.querySelector(".carousel-wrapper");
    let {width = 0} = wrapper.getBoundingClientRect();

    data.forEach((item,index)=>{
        let isActive = carousel.currentIndex === index?"active":"";
        carouselItem += `
         <div class="carousel-item ${
            "#" + index
        }" style='transform:translateX(${
            width * (index - 1)}px);transition-duration:${carousel.animationTimes}s'>
                <img src="${item.pic}" alt="">
            </div>
        `;
        carouselIndicatorsLi += ` <li data-slide-to="${index}" class="carousel-indicators-li ${isActive}"></li>`;
    })
    const carouselContainer = `
    <div class="carousel-container" style="transition: transform${carousel.animationTimes}s">
    ${carouselControl}
            <div class="carousel-content">
                ${carouselItem}
            </div>
        </div>`;
    const carouselIndicators = `
     <ul class="carousel-indicators d-flex">
            ${carouselIndicatorsLi}
        </ul>
    `;
    wrapper.innerHTML = carouselContainer + carouselIndicators;
}
Ajax({
    url: "/homepage/block/page",
}).then((res) => {
    console.log(res);
    carousel.data = res.data.blocks[0].extInfo.banners;
    //首次渲染轮播图
    carouselRender(carousel.data);
});
