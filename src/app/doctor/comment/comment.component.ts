import { Component, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { CommentService } from './comment.service';
registerElement(
    'StarRating',
    () => require('nativescript-star-ratings').StarRating
);

@Component({
    selector: 'ns-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
    constructor(
        private pageRoute: PageRoute,
        private router: RouterExtensions,
        private commentService: CommentService
    ) {}
    value: number = 1;
    max: number = 5;
    doctorId: string;
    comment: string;

    ngOnInit() {
        this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(param => {
                this.doctorId = param.get('doctorId');
            });
        });
    }

    saveComment() {
        if (this.value == 0 || this.comment === '') return;
        this.commentService
            .saveComment(this.doctorId, this.comment, this.value)
            .subscribe(
                (res: any) => {
                    console.log('comment added', res.data);
                    this.router.backToPreviousPage();
                },
                (error: any) => {
                    console.log(error);
                }
            );
    }
}
