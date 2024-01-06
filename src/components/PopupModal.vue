<template>
    <div>
       
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
            <div class="modal-dialog modal-width" >
                <div class="modal-content">
                <div class="modal-header row pb-0 border-0">
                    <div class="col-12 d-flex align-items-center">
                        <h1 class="modal-title fs-5 col-6" id="staticBackdropLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="col-12 border-1 border-bottom">
                        <ul class="d-flex ps-0 mt-2" style="list-style: none;">
                            <li class="me-2"> <a href="#">link</a> </li>
                            <li> <a href="#">link</a> </li>
                        </ul>
                    </div>
                </div>
                <div class="modal-body">
                    <form class="row border-bottom border-1 pb-3" role="search">
                        <div class="d-flex col-lg-6">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </div>
                        <div class="d-flex justify-content-end col-lg-6">
                            <button class="btn btn-secondary" v-tippy="{ content: 'List View', placement: 'top' }"><span v-html="listIcon"></span></button>
                            <button class="btn btn-secondary  ms-2" v-tippy="{ content: 'Sort Option', placement: 'top' }"><span v-html="azIcon"></span></button>
                        </div>
                    </form>
                    <div class="row">
                        <div class="col-12 my-2">
                            <h4>files</h4>
                        </div>
                        <div class="col-12 d-flex">
                            <div class="file-box me-2" > file 1 </div>
                            <div class="file-box me-2"> file 2 </div>
                            <div class="file-box"> file 3 </div>
                        </div>

                    </div>

                </div>
                <div class="modal-footer justify-content-start">
                    <button type="button" class="btn btn-primary">select</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { svgIcons } from './icons/SvgIcons';


    export default {
        data(){
            return{
                listIcon:svgIcons.list,
                azIcon:svgIcons.az,
            }
        }
    }
</script>

<style>
    .modal-width {
    max-width: 1200px !important;
    width: 100%;
    }
    .file-box{
        border: 1px solid #ced4da;
        padding: 5px;
        margin-bottom: 8px;
        display: flex;
        cursor: pointer;
        width: 120px;
        text-align: center;
        justify-content: center;
        align-items: center;
        height: 150px;
    }

</style>