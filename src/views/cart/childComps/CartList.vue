<template>
  <div class="cart-list">
    <scroll class="content">
      <li>content1</li>
      <li>content2</li>
      <li>content3</li>
      <li>content4</li>
      <li>content5</li>
      <li>content6</li>
      <li>content7</li>
      <li>content8</li>
      <li>content9</li>
      <li>content10</li>
      <li>content11</li>
      <li>content12</li>
      <li>content13</li>
      <li>content14</li>
      <li>content15</li>
      <li>content16</li>
      <li>content17</li>
      <li>content18</li>
      <li>content19</li>
      <li>content20</li>
      <li>content21</li>
      <li>content22</li>
      <li>content23</li>
      <li>content24</li>
      <li>content25</li>
      <li>content26</li>
      <li>content27</li>
      <li>content28</li>
      <li>content29</li>
      <li>content30</li>
      <li>content31</li>
      <li>content32</li>
      <li>content33</li>
      <li>content34</li>
      <li>content35</li>
      <li>content36</li>
      <li>content37</li>
      <li>content38</li>
      <li>content39</li>
      <li>content40</li>
      <li>content41</li>
      <li>content42</li>
      <li>content43</li>
      <li>content44</li>
      <li>content45</li>
      <li>content46</li>
      <li>content47</li>
      <li>content48</li>
      <li>content49</li>
      <li>content50</li>
      <li>content51</li>
      <li>content52</li>
      <li>content53</li>
      <li>content54</li>
      <li>content55</li>
      <li>content56</li>
      <li>content57</li>
      <li>content58</li>
      <li>content59</li>
      <li>content60</li>
      <li>content61</li>
      <li>content62</li>
      <li>content63</li>
      <li>content64</li>
      <li>content65</li>
      <li>content66</li>
      <li>content67</li>
      <li>content68</li>
      <li>content69</li>
      <li>content70</li>
      <li>content71</li>
      <li>content72</li>
      <li>content73</li>
      <li>content74</li>
      <li>content75</li>
      <li>content76</li>
      <li>content77</li>
      <li>content78</li>
      <li>content79</li>
      <li>content80</li>
      <li>content81</li>
      <li>content82</li>
      <li>content83</li>
      <li>content84</li>
      <li>content85</li>
      <li>content86</li>
      <li>content87</li>
      <li>content88</li>
      <li>content89</li>
      <li>content90</li>
      <li>content91</li>
      <li>content92</li>
      <li>content93</li>
      <li>content94</li>
      <li>content95</li>
      <li>content96</li>
      <li>content97</li>
      <li>content98</li>
      <li>content99</li>
      <li>content100</li>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll.vue";

import {mapGetters} from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
