        <ul class="list-group user-search">
            <li mentio-menu-item="person" ng-repeat="person in items" class="list-group-item">
                <img ng-src="{{person.imageUrl}}" class="user-photo">
                <span class="text-primary" ng-bind-html="person.name | mentioHighlight:typedTerm:'menu-highlighted' | unsafe"></span>
               
            </li>
        </ul>
